const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest')
const fs = require('fs');
const path = require('path');
const config = require("./../../config.json");

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./commands/');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                //const command = require(path.resolve(__dirname, '..', '..', 'commands', 'tools', 'dicegame.js'))
                const command = require(path.resolve(__dirname, '..', '..', 'commands', folder, file));
                //const command = require(`./commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: ${command.data.name}`);
            }
        }

        const rest = new REST({ version: '9' }).setToken(config.token);
        try {
            console.log('Refreshing (/) commands...');

            await rest.put(Routes.applicationGuildCommands(config.applicationid, config.guildid), {
                body: client.commandArray
            });
            console.log('Registered the (/) commands.');
        } catch (error) {
            console.error(error);
        }
    };
};