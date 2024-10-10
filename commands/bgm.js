const { SlashCommandBuilder } = require('discord.js');
const { createAudioResource, entersState, StreamType, AudioPlayerStatus, getVoiceConnection } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bgm")
    .setDescription("Changes the BGM")
    .addStringOption((option) =>
        option.setName("song").setDescription("Background song to play").setRequired(true)
        .addChoices(
            { name: "Casual", value: "casual" },
            { name: "Combat", value: "combat" },
            { name: "Duvroth general", value: "duvroth" },
            { name: "Flint general", value: "flint" },
            { name: "Kallayo and Flint", value: "kallayo-flint" },
            { name: "Kallayo mom", value: "kallayo-mom" },
            { name: "Kallayo stressed", value: "kallayo-stress" },
            { name: "Tezar", value: "kallayo-tezar" },
            { name: "Tezar death", value: "kallayo-tezar-death" },
            { name: "Meadow general", value: "meadow" },
            { name: "Sovia peaceful", value: "sovia-happy" },
            { name: "Zh'era happy", value: "zhera-happy" },
            { name: "Zh'era sombre", value: "zhera-sombre" },
            { name: "Play", value: "play" },
            { name: "Pause", value: "pause" },
        )),

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
  }
};
