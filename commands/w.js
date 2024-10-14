const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const GuildInfo = require(`../class/GuildInfo`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("w")
    .setDescription("Sends a whisper to someone else's private channel")
    .addStringOption((option) => 
        option.setName("recipient")
            .setDescription("Person to send a whisper to.")
            .setRequired(true)
            .setAutocomplete(true))
    .addStringOption((option) =>
        option.setName("message")
            .setDescription("Message to send.")
            .setRequired(true)),

  async execute(interaction) {
    
    await interaction.deferReply();
    const message = await interaction.options.getString('message');
    const recipient = await interaction.options.getString('recipient');
    const sender = await interaction.member.displayName;
    const guildInfo = new GuildInfo(await interaction.guild);
    const recipientChannel = await resolveChannel(interaction, recipient, guildInfo);

    console.log(`${new Date().toLocaleString()} - Sending whisper from ${sender} to ${recipient}`);

    whisperEmbed = createWhisper(sender, message);
    await recipientChannel.send({ embeds: [whisperEmbed] });
    return await interaction.editReply({ content:`Message sent!` });
  },

  async autocomplete(interaction) {
    const search = interaction.options.getFocused();
    const guildInfo = new GuildInfo(await interaction.guild);
    //const allCNames = [].push(guildInfo.Players.forEach(player => { player.Name })); //there HAS to be a way to oneline this
    let cNameList = [];
    guildInfo.Players.forEach(p => { cNameList.push(p.Name) });
    const allCNames = cNameList;
    const cNames = search == '' ? allCNames : allCNames.filter(cName => cName.toLowerCase().startsWith(search.toLowerCase())); //maybe?
    await interaction.respond(cNames.map(cName => ({ name: cName, value: cName })).slice(0, 25));
  }
};

async function resolveChannel(interaction, recipient, guildInfo) {
    for (let i = 0; i < guildInfo.Players.length; i++) {
        if (recipient == guildInfo.Players[i].Name) {
            return await interaction.guild.channels.resolve(guildInfo.Players[i].PrivateChannel);
        }
    }
}

function createWhisper(sender, message){
    
    return new EmbedBuilder()
        .setTitle(`Whisper from ${sender}`)
        .setColor(`#0a560c`)
        .addFields({ name: `\u200B`, value: message })
        .setFooter({ text: `You can reply to this whisper using /w.` });

}
