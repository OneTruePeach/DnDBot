module.exports = {
    name: 'interactionCreate',
    async execute(interaction){
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) { return console.log("uh oh stinky"); }

            try {
                await command.execute(interaction);
            } catch(error) {
                console.error(error);
                await interaction.followUp({ content: `There was an issue executing /${command.name}`, ephemeral: true });
            }
        }
    }
}