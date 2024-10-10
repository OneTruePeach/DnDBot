const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { getVoiceConnection, createAudioResource, entersState, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const sessionHandler = require(`../handlers/sessionHandler`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rc")
    .setDescription("Starts a ready check for session start or short breaks."),

  async execute(interaction) {
    var vcGuild = await interaction.client.guilds.resolve(process.env.GUILD_ID);
    var vcChannel = await vcGuild.channels.resolve(process.env.VC_ID);
    var vcUsers = await vcChannel?.members || null;
    if (vcUsers == null) { interaction.reply(`There's nobody in the vc silly`) }

    console.log(`${new Date().toLocaleString()} - Readychecking ${vcChannel.name}`);

    let i = 0;
    var userString = ""
    var userList = [];
    var userReadyStates = [];
    vcUsers = vcUsers.filter((u) => !u.user.bot);
    vcUsers.each(user => {
        userString += `${user.displayName}\n`;
        userList[i] = user.id;
        userReadyStates[i] = 'h';
        i++;
    });

    const soundInitiate = createAudioResource(`./assets/sounds/initiate.mp3`, {inputType: StreamType.Arbitrary});
    const soundSuccess = createAudioResource(`./assets/sounds/success.mp3`, {inputType: StreamType.Arbitrary});
    const soundFailure = createAudioResource(`./assets/sounds/failure.mp3`, {inputType: StreamType.Arbitrary});

    pausedByRC = await sessionHandler.execute(interaction, true, true);
    vcConnection = getVoiceConnection(process.env.GUILD_ID);

    RCaudioPlayer.play(soundInitiate);
    vcConnection.subscribe(RCaudioPlayer);

    var [embed, row] = createReply(userString, userReadyStates);
    const response = await interaction.reply({ embeds: [embed], components: [row] });
    const readyCollector = await response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

    readyCollector.on('collect', async i => {
        userIndex = userList.indexOf(i.user.id);
        userReadyStates[userIndex] = i.customId == 'rc_ready' ? 'r' : 'n';
        [embed, row] = createReply(userString, userReadyStates);
        await interaction.editReply({ embeds: [embed], components: [row] });
        let numReady = userReadyStates.filter(a => a === "r").length
        let numHolding = userReadyStates.filter(a => a === "h").length
        if (numHolding == 0) {
            if (numReady == userReadyStates.length) {
                interaction.followUp(`Everyone is ready!`);
                RCaudioPlayer.play(soundSuccess);
                await entersState(RCaudioPlayer, AudioPlayerStatus.Idle, 5000);
                if (pausedByRC) { vcConnection.subscribe(BGMaudioPlayer); BGMaudioPlayer.unpause(); }
                return;
            } else {
                interaction.followUp(`Ready check ended. ${numReady}/${userReadyStates.length} people are ready.`);
                RCaudioPlayer.play(soundFailure);
                await entersState(RCaudioPlayer, AudioPlayerStatus.Idle, 5000);
                if (pausedByRC) { vcConnection.subscribe(BGMaudioPlayer); BGMaudioPlayer.unpause(); }
                return;
            }
        }
        i.deferUpdate();
    });

    readyCollector.on('end', async c => {
        let numReady = userReadyStates.filter(a => a === "r").length
        let numHolding = userReadyStates.filter(a => a === "h").length
        if (numHolding != 0) {
            interaction.followUp(`Ready check ended. ${numReady}/${userReadyStates.length} people are ready.`);
            RCaudioPlayer.play(soundFailure);
            await entersState(RCaudioPlayer, AudioPlayerStatus.Idle, 5000);
            if (pausedByRC) { vcConnection.subscribe(BGMaudioPlayer); BGMaudioPlayer.unpause(); }
            return;
        }
    });
  },
};

function createReply(userString, userReadyStates){
    
    let userReadyString = '';
    for (let i = 0; i < userReadyStates.length; i++) {
        let emoji;
        switch(userReadyStates[i]) {
            case 'r':
                emoji = `✅`;
                break;
            case 'h':
                emoji = `⏳`;
                break;
            case 'n':
                emoji = `❌`;
                break;
        }
        userReadyString += `${emoji}\n`;
    }

    const embed = new EmbedBuilder()
        .setTitle(`Ready Check!`)
        .setColor(`#0a560c`)
        .addFields(
            {name: `\u200B`, value: userString, inline: true},
            {name: `\u200B`, value: userReadyString, inline: true},
    );

    const readyButton = new ButtonBuilder()
        .setCustomId('rc_ready')
        .setLabel(`✔️`)
        .setStyle(ButtonStyle.Success);

    const notReadyButton = new ButtonBuilder()
        .setCustomId('rc_not_ready')
        .setLabel(`❌`)
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder ()
        .addComponents(readyButton, notReadyButton);

    return [embed, row];
}
