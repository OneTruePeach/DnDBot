const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sessionHandler = require(`../handlers/sessionHandler`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("w")
    .setDescription("Sends a whisper to someone else's private channel")
    .addStringOption((option) => 
        option.setName("recipient")
            .setDescription("Person to send a whisper to.")
            .addChoices(
                { name: "Bielze", value: "Bielze" },
                { name: "Duvroth", value: "Duvroth" },
                { name: "Flint", value: "Flint" },
                { name: "Kallayo", value: "Kallayo" },
                { name: "Kiraya", value: "Kiraya" },
                { name: "Meadow", value: "Meadow" },
                { name: "Sovia", value: "Sovia" },
                { name: "Zh\'Era", value: "Zh\'Era" })
            .setRequired(true))
    .addStringOption((option) =>
        option.setName("message")
            .setDescription("Message to send.")
            .setRequired(true)),

  async execute(interaction) {
    
    interaction.deferReply();
    const message = await interaction.options.getString('message');
    const recipient = await interaction.options.getString('recipient');
    const sender = await interaction.member.displayName;
    const recipientChannel = await resolveChannel(interaction, recipient);

    console.log(`${new Date().toLocaleString()} - Sending whisper from ${sender} to ${recipient}`);

    whisperEmbed = createWhisper(sender, message);
    await recipientChannel.send({ embeds: [whisperEmbed] });
    interaction.editReply({ content:`Message sent!` });
  },
};

async function resolveChannel(interaction, recipient){
    switch (recipient) {
        case "Bielze":
            return await interaction.guild.channels.resolve(process.env.BIELZE_CHANNEL_ID);
        case "Duvroth":
            return await interaction.guild.channels.resolve(process.env.DUVROTH_CHANNEL_ID);
        case "Flint":
            return await interaction.guild.channels.resolve(process.env.FLINT_CHANNEL_ID);
        case "Kallayo":
            return await interaction.guild.channels.resolve(process.env.KALLAYO_CHANNEL_ID);
        case "Kiraya":
            return await interaction.guild.channels.resolve(process.env.KIRAYA_CHANNEL_ID);
        case "Meadow":
            return await interaction.guild.channels.resolve(process.env.MEADOW_CHANNEL_ID);
        case "Sovia":
            return await interaction.guild.channels.resolve(process.env.SOVIA_CHANNEL_ID);
        case "Zh\'Era":
            return await interaction.guild.channels.resolve(process.env.ZHERA_CHANNEL_ID);
        default:
            return null;
    }
}

function createWhisper(sender, message){
    
    return new EmbedBuilder()
        .setTitle(`Whisper from ${sender}`)
        .setColor(`#0a560c`)
        .addFields({ name: `\u200B`, value: message })
        .setFooter({ text: `You can reply to this whisper using /w.` });
}
