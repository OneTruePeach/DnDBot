const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const fs = require('fs');
require('dotenv').config();

doDiscordMainSetup();
doDiscordAmbienceSetup();

async function doDiscordMainSetup() {
    const clientMain = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
        ]
    });

    clientMain.commands = new Collection();

    //-------------------gray's server initialization-------------
    global.mainBotHollowExplorersSessionActive = false;
    global.MainBotHollowExplorersBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.MainBotHollowExplorersRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------gray's 2nd server initialization------------
    global.mainBotHollowPantheonSessionActive = false;
    global.MainBotHollowPantheonBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.MainBotHollowPantheonRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------squiggl's server initialization------------
    global.mainBotNightCitySessionActive = false;
    global.MainBotNightCityBGMAudioPlayer = createAudioPlayer({
        behaviors: {noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.MainBotNightCityRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------testing server initialization--------------
    global.mainBotTestingSessionActive = false;
    global.MainBotTestingBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.MainBotTestingRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    const commandFiles = fs.readdirSync('./bots/main/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./bots/main/commands/${file}`);
        clientMain.commands.set(command.data.name, command);
    }

    const eventFiles = fs.readdirSync('./bots/main/events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./bots/main/events/${file}`);
        if (event.once) {
            clientMain.once(event.name, (...args) => event.execute(...args, clientMain));
        } else {
            clientMain.on(event.name, (...args) => event.execute(...args, clientMain));
        }
    }

    await clientMain.login(process.env.MAIN_TOKEN);
}

async function doDiscordAmbienceSetup() {
    const clientAmbience = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
        ]
    });

    clientAmbience.commands = new Collection();

    //-------------------gray's server initialization-------------
    global.ambienceBotHollowExplorersSessionActive = false;
    global.AmbienceBotHollowExplorersBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.AmbienceBotHollowExplorersRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------gray's 2nd server initialization------------
    global.ambienceBotHollowPantheonSessionActive = false;
    global.AmbienceBotHollowPantheonBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.AmbienceBotHollowPantheonRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------squiggl's server initialization------------
    global.ambienceBotTestingSessionActive = false;
    global.AmbienceBotTestingBGMAudioPlayer = createAudioPlayer({
        behaviors: {noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.AmbienceBotTestingRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------testing server initialization---------------

    const commandFiles = fs.readdirSync('./bots/ambience/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./bots/ambience/commands/${file}`);
        clientAmbience.commands.set(command.data.name, command);
    }

    const eventFiles = fs.readdirSync('./bots/ambience/events').filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(`./bots/ambience/events/${file}`);
        if (event.once) {
            clientAmbience.once(event.name, (...args) => event.execute(...args, clientAmbience));
        } else {
            clientAmbience.on(event.name, (...args) => event.execute(...args, clientAmbience));
        }
    }

    await clientAmbience.login(process.env.AMBIENCE_TOKEN);
}