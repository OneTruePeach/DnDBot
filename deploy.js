const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

client1Commands = [];
client2Commands = [];

const client1CommandFiles = fs.readdirSync('./bots/main/commands').filter(file => file.endsWith('.js'));
for (const file of client1CommandFiles) {
    const client1Command = require(`./bots/main/commands/${file}`);
    client1Commands.push(client1Command.data.toJSON());
}

const client2CommandFiles = fs.readdirSync('./bots/ambience/commands').filter(file => file.endsWith('.js'));
for (const file of client2CommandFiles) {
    const client2Command = require(`./bots/ambience/commands/${file}`);
    client2Commands.push(client2Command.data.toJSON());
}

const client1Rest = new REST().setToken(process.env.MAIN_TOKEN);

const client2Rest = new REST().setToken(process.env.AMBIENCE_TOKEN);

(async() => {
    console.log('Refreshing commands for main bot...');
    try {
        await client1Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_1, process.env.GUILD_ID_1),
            { body: client1Commands },
        );
        console.log(`Main refreshed successfully for Guild: ${process.env.GUILD_ID_1}`);
    } catch(error) {
        console.error(error);
    }
    try {
        await client1Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_1, process.env.GUILD_ID_2),
            { body: client1Commands },
        );
        console.log(`Main refreshed successfully for Guild: ${process.env.GUILD_ID_2}`);
    } catch(error) {
        console.error(error);
    }
    try {
        await client1Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_1, process.env.GUILD_ID_3),
            { body: client1Commands },
        );
        console.log(`Main refreshed successfully for Guild: ${process.env.GUILD_ID_3}`);
    } catch(error) {
        console.error(error);
    }
})();

(async() => {
    console.log('Refreshing commands for ambience bot...');
    try {
        await client2Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_2, process.env.GUILD_ID_1),
            { body: client2Commands },
        );
        console.log(`Ambience refreshed successfully for Guild: ${process.env.GUILD_ID_1}`);
    } catch(error) {
        console.error(error);
    }
    try {
        await client2Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_2, process.env.GUILD_ID_2),
            { body: client2Commands },
        );
        console.log(`Ambience refreshed successfully for Guild: ${process.env.GUILD_ID_2}`);
    } catch(error) {
        console.error(error);
    }
    try {
        await client2Rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID_2, process.env.GUILD_ID_3),
            { body: client2Commands },
        );
        console.log(`Ambience refreshed successfully for Guild: ${process.env.GUILD_ID_3}`);
    } catch(error) {
        console.error(error);
    }
})();