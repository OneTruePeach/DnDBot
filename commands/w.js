const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const GuildInfo = require(`../class/GuildInfo`);
const fs = require(`fs`);

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


    const senderIcon = fs.existsSync(`./assets/Night\ City/avatars/${interaction.member.id}.png`) ? 
      new AttachmentBuilder(`./assets/Night\ City/avatars/${interaction.member.id}.png`, { name: 'senderIcon.png' }) : 
      new AttachmentBuilder(`./assets/Night\ City/avatars/default.png`, { name: 'senderIcon.png' });
    //senderIcon = new AttachmentBuilder(`./assets/Night\ City/avatars/${interaction.member.id}.png`, { name: 'senderIcon.png' });

    whisperEmbedToRecipient = createWhisper(sender, message, false, senderIcon);
    await recipientChannel.send({ 
      embeds: [whisperEmbedToRecipient],
      files: [senderIcon],
    });

    whisperEmbedToSender = createWhisper(sender, message, true, senderIcon);
    return await interaction.editReply({ 
      embeds: [whisperEmbedToSender],
      files: [senderIcon],
    });
  },

  async autocomplete(interaction) {
    const search = interaction.options.getFocused();
    const guildInfo = new GuildInfo(await interaction.guild);
    //const allCNames = [].push(guildInfo.Players.forEach(player => { player.Name })); //there HAS to be a way to oneline this
    let cNameList = [];
    guildInfo.Players.forEach(p => { cNameList.push(p.Name) });
    const allCNames = cNameList;
    const cNames = search == '' ? allCNames : allCNames.filter(cName => cName.toLowerCase().startsWith(search.toLowerCase())); 
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

function createWhisper(recipient, message, isSender, icon){
    return new EmbedBuilder()
        .setAuthor({ name: `${recipient}`, iconURL: `attachment://${icon.name}` })
        //.setTitle(`${isSender ? "To" : "From"} ${recipient}:`)
        .setColor(`${isSender ? '#0a560c' : '#d6d6d6'}`)
        .setDescription(message)
        //.setThumbnail(`attachment://${icon.name}`);
        //.addFields({ name: `\u200B`, value: message })
        //.setFooter({ text: `${"You can reply to this whisper using /w."}` });
}
