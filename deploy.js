const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST().setToken(process.env.TOKEN);

(async() => {
    try {
        console.log('Refreshing commands...');
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log("Commands refreshed.");
    } catch(error) {
        console.log(error);
    }
})();