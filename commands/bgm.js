const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, entersState, StreamType, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bgm")
    .setDescription("Changes the BGM")
    .addStringOption((option) =>
        option.setName("song").setDescription("Background song to play").setRequired(true).setAutocomplete(true)),

  async execute(interaction) {
    var song = await interaction.options.getString("song");
    var vcGuild = await interaction.client.guilds.resolve(process.env.GUILD_ID);
    var vcChannel = await vcGuild.channels.resolve(process.env.VC_ID);
    console.log(`${new Date().toLocaleString()} - changing BGM to ${song} in ${vcChannel.name}`);

    canPlay = await sessionHandler.execute(interaction, true, false);
    vcConnection = getVoiceConnection(process.env.GUILD_ID);

    if ( song == 'pause' ) {
        interaction.reply({ content:`Pausing BGM.`, ephemeral: true });
         return BGMaudioPlayer.pause();
    } 

    if ( !canPlay ) {
        interaction.reply({ content: `Waiting for ready check to finish. The music should start shortly.`, ephemeral: true })
        await entersState(RCaudioPlayer, AudioPlayerStatus.Idle, 70000);
    }

    if ( song == 'play' ) {
      interaction.reply({ content:`Unpausing BGM.`, ephemeral: true });
      return BGMaudioPlayer.unpause();
    } else {
      BGMsong = createAudioResource(`./assets/BGM/${song}.mp3`, {inputType: StreamType.Arbitrary});
      BGMaudioPlayer.play(BGMsong);
      vcConnection.subscribe(BGMaudioPlayer);
      if (!canPlay) {
        interaction.followUp({ content:`Playing ${song}.`, ephemeral: true });
      } else {
        interaction.reply({ content:`Playing ${song}.`, ephemeral: true });
      }
    }

    BGMaudioPlayer.on(AudioPlayerStatus.Idle, () => { //i fucking hate this
      BGMsong = createAudioResource(`./assets/BGM/${song}.mp3`, {inputType: StreamType.Arbitrary});
      BGMaudioPlayer.play(BGMsong);
    });
  },

  async spoilerSongs(interaction) {
    const search = interaction.options.getFocused();
    const simpleSongs = [
      [ "Casual",                    "casual" ],
      [ "Play",                        "play" ],
      [ "Pause",                      "pause" ],
    ];
		const allSongs = [
      [ "Casual",                    "casual" ],
      [ "Combat",                    "combat" ],
      [ "Duvroth general",          "duvroth" ],
      [ "Flint general",              "flint" ],
      [ "Kallayo and Flint",  "kallayo-flint" ],
      [ "Kallayo mom",          "kallayo-mom" ],
      [ "Kallayo stressed",  "kallayo-stress" ],
      [ "Tezar",              "kallayo-tezar" ],
      [ "Tezar death",  "kallayo-tezar-death" ],
      [ "Meadow general",            "meadow" ],
      [ "Sovia peaceful",       "sovia-happy" ],
      [ "Zh'era happy",         "zhera-happy" ],
      [ "Zh'era sombre",       "zhera-sombre" ],
      [ "Play",                        "play" ],
      [ "Pause",                      "pause" ],
    ];

    applicableSongs = (interaction.user.id == '203542663851409409' || interaction.user.id == '200297075882065921') ? allSongs : simpleSongs;
    const filtered = search == '' ? applicableSongs : applicableSongs.filter(song => song.startsWith(search));
    await interaction.respond(filtered.map(song => ({ name: song[0], value: song[1] })).slice(0, 25));
  }
};