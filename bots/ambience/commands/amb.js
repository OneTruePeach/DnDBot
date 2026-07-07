const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { createAudioResource, entersState, StreamType, AudioPlayerStatus, getVoiceConnections } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);
const GuildInfo = require(`../class/GuildInfo`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("amb")
    .setDescription("Changes the ambience")
    .addStringOption((option) =>
      option.setName("song")
        .setDescription("Sound to play")
        .setRequired(true)
        .setAutocomplete(true)),

  async execute(interaction) {
    const song = await interaction.options.getString("song");
    const guildInfo = new GuildInfo(await interaction.guild);
    const songName = guildInfo.AllSongs.filter(function (a) {return !!~a.indexOf(song)})[0][0]; //programmers hate this one trick
    console.log(`${new Date().toLocaleString()} - Ambience | Changing Ambience to ${songName} (${song}) in ${guildInfo.Name}`);

    canPlay = await sessionHandler.execute(interaction, guildInfo, true, false);
    vcConnections = getVoiceConnections("ambience");
    vcConnectionToGuild = vcConnections.get(guildInfo.Id);
    vcConnection = vcConnectionToGuild;

    if ( song == 'pause' ) {
        interaction.reply({ content:`Pausing Ambience.`, flags: MessageFlags.Ephemeral });
         return guildInfo.BGMAudioPlayer.pause();
    } 

    if ( !canPlay ) {
        interaction.reply({ content: `Waiting for ready check to finish. The music should start shortly.`, flags: MessageFlags.Ephemeral })
        await entersState(guildInfo.RCAudioPlayer, AudioPlayerStatus.Idle, 70000);
    }

    if ( song == 'play' ) {
      interaction.reply({ content:`Unpausing Ambience.`, flags: MessageFlags.Ephemeral });
      return guildInfo.BGMAudioPlayer.unpause();
    } else {
      BGMsong = createAudioResource(`./assets/${guildInfo.Id}/AMB/${song}.ogg`, {inputType: StreamType.OggOpus});
      guildInfo.BGMAudioPlayer.play(BGMsong);
      vcConnection.subscribe(guildInfo.BGMAudioPlayer);
      if (!canPlay) {
        interaction.followUp({ content:`Playing ${songName}.`, flags: MessageFlags.Ephemeral });
      } else {
        interaction.reply({ content:`Playing ${songName}.`, flags: MessageFlags.Ephemeral });
      }
    }

    guildInfo.BGMAudioPlayer.on(AudioPlayerStatus.Idle, async () => { //i fucking hate this
      BGMsong = createAudioResource(`./assets/${guildInfo.Id}/AMB/${song}.ogg`, {inputType: StreamType.OggOpus});
      guildInfo.BGMAudioPlayer.play(BGMsong);
    });
  },

  async autocomplete(interaction) {
    const search = interaction.options.getFocused();
    const guildInfo = new GuildInfo(await interaction.guild);
    const player = guildInfo.Players.find(p => p.Id == interaction.user.id);
    const applicableSongs = guildInfo.PrivilegedUsers.find(i => i == interaction.user.id) ? guildInfo.AllSongs : [...guildInfo.SimpleSongs, ...player.Songs];
    const filtered = search == '' ? applicableSongs : applicableSongs.filter(song => song[0].toLowerCase().includes(search.toLowerCase()));
    await interaction.respond(filtered.map(song => ({ name: song[0], value: song[1] })).slice(0, 25));
  }
};