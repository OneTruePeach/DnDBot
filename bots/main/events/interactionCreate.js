const { MessageFlags } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        const command = interaction.client.commands.get(interaction.commandName);
        if (interaction.isChatInputCommand()) {
            try {
                await command.execute(interaction);
            } catch(error) {
                console.error(error);
                await interaction.followUp({ content: `There was an issue executing your command.`, flags: MessageFlags.Ephemeral });
            }
        }

        if (interaction.isAutocomplete()) {
            try {
                await command.autocomplete(interaction);
            } catch (e) {
                console.error(e);
            }
        }
    }
}