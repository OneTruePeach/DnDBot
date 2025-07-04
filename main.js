const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
    ]
});

client.commands = new Collection();

global.hollowExplorersSessionActive = false;
global.HollowExplorersBGMAudioPlayer = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
});
global.HollowExplorersRCAudioPlayer = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
});

global.hollowPantheonSessionActive = false;
global.HollowPantheonBGMAudioPlayer = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
});
global.HollowPantheonRCAudioPlayer = createAudioPlayer({
    behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
});

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

client.login(process.env.TOKEN);