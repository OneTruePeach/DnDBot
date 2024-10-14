const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, entersState, joinVoiceChannel } = require('@discordjs/voice');
const GuildInfo = require(`../class/GuildInfo`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("resets bot to steady state, and stops all voice activity."),

  async execute(interaction) {

    console.log(`${new Date().toLocaleString()} - Stopping via command`);

    try {
      var guildInfo = new GuildInfo(await interaction.guild);
      currentConnection = joinVoiceChannel({
          channelId: guildInfo.VcId,
          guildId: guildInfo.Id,
          adapterCreator: interaction.guild.voiceAdapterCreator,
      });
      await entersState(currentConnection, VoiceConnectionStatus.Ready, 5000);
      currentConnection.destroy();
      guildInfo.sessionActive = false;
    } catch(e) {
      console.error(e);
    }

    return interaction.reply({ content: `Stopped bot.`, ephemeral: true });
  },
};
