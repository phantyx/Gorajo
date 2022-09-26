const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Checks API and Client Latency'),
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });
        const newMessage = `API Latency: ${client.ws.ping}ms\nClient Latency: ${message.createdTimestamp - interaction.createdTimestamp}ms`
        await interaction.editReply({
            content: newMessage
        });
    }
}