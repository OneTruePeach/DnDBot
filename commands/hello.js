const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { getVoiceConnection, createAudioResource, entersState, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);
const GuildInfo = require(`../class/GuildInfo`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("hi!"),

    async execute(interaction) {
        const guildInfo =  new GuildInfo(await interaction.guild);
        var vcChannel = await interaction.guild.channels.resolve(guildInfo.VcId);
        var vcUsers = await vcChannel?.members || null;
        if (vcUsers == null) { interaction.reply(`There's nobody in the vc silly`) }

        console.log(`${new Date().toLocaleString()} - Greeting ${vcChannel.name}`);
        interaction.reply({ content: 'hiii :D', flags: MessageFlags.Ephemeral })

        const helloSound = createAudioResource(`./assets/sounds/pikmin.mp3`, {inputType: StreamType.Arbitrary});

        pausedByHello = await sessionHandler.execute(interaction, guildInfo, true, true);
        vcConnection = getVoiceConnection(guildInfo.Id);

        guildInfo.RCAudioPlayer.play(helloSound);
        vcConnection.subscribe(guildInfo.RCAudioPlayer);
        await entersState(guildInfo.RCAudioPlayer, AudioPlayerStatus.Idle, 5000);
        if (pausedByHello) { 
            vcConnection.subscribe(guildInfo.BGMAudioPlayer); 
            guildInfo.BGMAudioPlayer.unpause(); 
        }
    }
}