const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, StreamType, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');

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
    vcUsers.each(user => {
        userString += `${user.displayName}\n`;
        userList[i] = user.id;
        userReadyStates[i] = 'h';
        i++;
    });

    const audioPlayer = createAudioPlayer();

    const soundInitiate = createAudioResource(`./assets/sounds/initiate.mp3`, {inputType: StreamType.Arbitrary});
    const soundSuccess = createAudioResource(`./assets/sounds/success.mp3`, {inputType: StreamType.Arbitrary});
    const soundFailure = createAudioResource(`./assets/sounds/failure.mp3`, {inputType: StreamType.Arbitrary});

    const vcConnection = await joinVoiceChannel({
        channelId: process.env.VC_ID,
        guildId: process.env.GUILD_ID,
        adapterCreator: vcGuild.voiceAdapterCreator,
    });

    audioPlayer.play(soundInitiate);
    vcConnection.subscribe(audioPlayer);

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
                audioPlayer.play(soundSuccess);
                await entersState(audioPlayer, AudioPlayerStatus.Idle, 5000);
                    vcConnection.destroy();
            } else {
                interaction.followUp(`Ready check ended. ${numReady}/${userReadyStates.length} people are ready.`);
                audioPlayer.play(soundFailure);
                await entersState(audioPlayer, AudioPlayerStatus.Idle, 5000);
                    vcConnection.destroy();
            }
        }
        i.deferUpdate();
    });

    readyCollector.on('end', async collected => {
        let numReady = userReadyStates.filter(a => a === "r").length
        let numHolding = userReadyStates.filter(a => a === "h").length
        if (numHolding != 0) {
            interaction.followUp(`Ready check ended. ${numReady}/${userReadyStates.length} people are ready.`);
            audioPlayer.play(soundFailure);
            await entersState(audioPlayer, AudioPlayerStatus.Idle, 5000);
                vcConnection.destroy();
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
