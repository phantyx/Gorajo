const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Lists all commands and details'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        //EXPAND
        //GET COMMANDS FROM DIRECTORY FILTER(.js)
        const newMessage = `Commands: \n
            /help - Lists all commands and details \n
            /ping - Checks API and Client Latency \n
            /dicegame - Plays the dice game \n`
        await interaction.editReply({
            content: newMessage
        });
    }
}