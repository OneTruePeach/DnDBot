const { joinVoiceChannel, entersState, getVoiceConnection, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    async execute(interaction, playing, interrupt) {
        
        var currentConnection = getVoiceConnection(process.env.GUILD_ID);
        if (playing) {
            if (!currentConnection) {
                var vcGuild = await interaction.client.guilds.resolve(process.env.GUILD_ID);
                currentConnection = joinVoiceChannel({
                    channelId: process.env.VC_ID,
                    guildId: process.env.GUILD_ID,
                    adapterCreator: vcGuild.voiceAdapterCreator,
                });
                await entersState(currentConnection, VoiceConnectionStatus.Ready, 5000);
            }

            sessionActive = true;
            if ((BGMaudioPlayer.state.status == 'playing') && interrupt) { BGMaudioPlayer.pause(); }
            if ((RCaudioPlayer.state.status == 'playing') && !interrupt) { return false; }
            return true;

        } else {
            if (currentConnection) {
                currentConnection.destroy();
                sessionActive = false;
            }
        }
    },
};
