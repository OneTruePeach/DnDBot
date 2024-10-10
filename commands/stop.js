const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus, entersState, joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("resets bot to steady state, and stops all voice activity."),

  async execute(interaction) {

    console.log(`${new Date().toLocaleString()} - stopping via command.`);

    try {
      var vcGuild = await interaction.client.guilds.resolve(process.env.GUILD_ID);
      currentConnection = joinVoiceChannel({
          channelId: process.env.VC_ID,
          guildId: process.env.GUILD_ID,
          adapterCreator: vcGuild.voiceAdapterCreator,
      });
      await entersState(currentConnection, VoiceConnectionStatus.Ready, 5000);
      currentConnection.destroy();
      sessionActive = false;
    } catch(e) {
      console.error(e);
    }

    return interaction.reply({ content: `Attempted to reset.`, ephemeral: true });
  },
};
