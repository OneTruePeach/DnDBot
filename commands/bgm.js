const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, entersState, StreamType, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);
const GuildInfo = require(`../class/GuildInfo`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bgm")
    .setDescription("Changes the BGM")
    .addStringOption((option) =>
      option.setName("song")
        .setDescription("Background song to play")
        .setRequired(true)
        .setAutocomplete(true)),

  async execute(interaction) {
    const song = await interaction.options.getString("song");
    const guildInfo = new GuildInfo(await interaction.guild);
    console.log(`${new Date().toLocaleString()} - Changing BGM to ${song} in ${guildInfo.Name}`);

    canPlay = await sessionHandler.execute(interaction, guildInfo, true, false);
    vcConnection = getVoiceConnection(guildInfo.Id);

    if ( song == 'pause' ) {
        interaction.reply({ content:`Pausing BGM.`, ephemeral: true });
         return guildInfo.BGMAudioPlayer.pause();
    } 

    if ( !canPlay ) {
        interaction.reply({ content: `Waiting for ready check to finish. The music should start shortly.`, ephemeral: true })
        await entersState(guildInfo.RCAudioPlayer, AudioPlayerStatus.Idle, 70000);
    }

    if ( song == 'play' ) {
      interaction.reply({ content:`Unpausing BGM.`, ephemeral: true });
      return guildInfo.BGMAudioPlayer.unpause();
    } else {
      BGMsong = createAudioResource(`./assets/${guildInfo.Name}/BGM/${song}.ogg`, {inputType: StreamType.OggOpus});
      guildInfo.BGMAudioPlayer.play(BGMsong);
      vcConnection.subscribe(guildInfo.BGMAudioPlayer);
      if (!canPlay) {
        interaction.followUp({ content:`Playing ${song}.`, ephemeral: true });
      } else {
        interaction.reply({ content:`Playing ${song}.`, ephemeral: true });
      }
    }

    guildInfo.BGMAudioPlayer.on(AudioPlayerStatus.Idle, async () => { //i fucking hate this
      BGMsong = createAudioResource(`./assets/${guildInfo.Name}/BGM/${song}.ogg`, {inputType: StreamType.OggOpus});
      guildInfo.BGMAudioPlayer.play(BGMsong);
    });
  },

  async autocomplete(interaction) {
    const search = interaction.options.getFocused();
    const guildInfo = new GuildInfo(await interaction.guild);
    const player = guildInfo.Players.find(p => p.Id == interaction.user.id);
    console.log(player);
    const applicableSongs = guildInfo.PrivilegedUsers.find(i => i == interaction.user.id) ? guildInfo.AllSongs : [...guildInfo.SimpleSongs, ...player.Songs];
    console.log(applicableSongs);
    const filtered = search == '' ? applicableSongs : applicableSongs.filter(song => song[0].toLowerCase().startsWith(search.toLowerCase()));
    await interaction.respond(filtered.map(song => ({ name: song[0], value: song[1] })).slice(0, 25));
  }
};