const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const envVars = process.env;
const { TOKEN, DB_URI, APPLICATIONID, GUILDID } = envVars;
const config = require("./config.json");
const Enmap = require('enmap');
const mongoose = require("mongoose");

config.token = TOKEN;
config.db_uri = DB_URI;
config.applicationid = APPLICATIONID;
config.guildid = GUILDID

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
    .readdirSync(`./functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep',
    autoEnsure: {
        prefix: "!",
    }
});
/**
mongoose
    .connect(process.env.DB_URI)
    .then(console.log("Sucessfully connected to the database"))
    .catch((e) => {
    console.log("error caught");
    console.log(e);
});
*/
client.handleEvents();
client.handleCommands();
client.login(config.token);