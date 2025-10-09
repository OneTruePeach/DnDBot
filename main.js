const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { createAudioPlayer, NoSubscriberBehavior } = require('@discordjs/voice');
const express = require('express');
//const requestSong = require('./routes/requestSong')
//const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

doDiscordSetup();
doExpressSetup();
//doMongooseSetup();

async function doDiscordSetup() {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMembers,
            GatewayIntentBits.GuildVoiceStates,
        ]
    });

    client.commands = new Collection();

    //-------------------gray's server initialization-------------
    global.hollowExplorersSessionActive = false;
    global.HollowExplorersBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.HollowExplorersRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------gray's 2nd server initialization------------
    global.hollowPantheonSessionActive = false;
    global.HollowPantheonBGMAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.HollowPantheonRCAudioPlayer = createAudioPlayer({
        behaviors: { noSubscriber: NoSubscriberBehavior.Pause },
    });

    //-----------------squiggl's server initialization------------
    global.nightCitySessionActive = false;
    global.NightCityBGMAudioPlayer = createAudioPlayer({
        behaviors: {noSubscriber: NoSubscriberBehavior.Pause },
    });
    global.NightCityRCAudioPlayer = createAudioPlayer({
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

    await client.login(process.env.TOKEN);
}

async function doExpressSetup() {
    const app = express();
    app.get(`/api/SongRequest/:id`, (req, res) => {
        console.log(req.params.id);
        res.status(200).send("Received.");
    });

    app.listen(process.env.PORT, () => {
        console.log(`${new Date().toLocaleString()} - Express ready`);
    })
}

/*async function doMongooseSetup() {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log(`${new Date().toLocaleString()} - MongoDB ready`);
    }).catch((e) => {
        console.error(e);
    })
}*/