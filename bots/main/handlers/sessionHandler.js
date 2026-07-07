const { joinVoiceChannel, entersState, getVoiceConnections, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    async execute(interaction, guild, playing, interrupt) {
        
        var currentConnections = getVoiceConnections("main");
        if (currentConnections) {
            var currentConnection = currentConnections.get(guild.Id);
        }

        if (playing) {
            if (!currentConnection) {
                var discordGuild = await interaction.guild;
                currentConnection = joinVoiceChannel({
                    channelId: guild.VcId,
                    guildId: guild.Id,
                    adapterCreator: discordGuild.voiceAdapterCreator,
                    group: "main",
                });
                await entersState(currentConnection, VoiceConnectionStatus.Ready, 5000);
            }

            sessionActive = true;
            if ((guild.BGMAudioPlayer.state.status == 'playing') && interrupt) { guild.BGMAudioPlayer.pause(); }
            if ((guild.RCAudioPlayer.state.status == 'playing') && !interrupt) { return false; }
            return true;

        } else {
            if (currentConnection) {
                currentConnection.destroy();
                sessionActive = false;
            }
        }
    },
};