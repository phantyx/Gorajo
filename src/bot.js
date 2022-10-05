const dotenv = require('dotenv');
const { token } = process.env;
//const { connect } = require('mongoose');
const mongoose = require('mongoose');
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");

dotenv.config();

//console.log(process.env.DB_URI, "is database token")
//console.log(process.env.token, "is discord token")
mongoose
    .connect(process.env.DB_URI)
    .then(console.log('Sucessfully connected to the database'))
    .catch((e) => {
        console.log('error caught');
        console.log(e)
    })

const client = new Client({ intents: GatewayIntentBits.Guilds });
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.login(process.env.token);

// (async () => {
//     await connect(databaseToken).catch(console.error);
// })();




