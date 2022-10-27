const { SlashCommandBuilder } = require('discord.js');
const Trivia = require('../../minigames/Trivia.js');
const trivia = new Trivia();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('trivia')
        .setDescription('Starts the trivia game.'),
    async execute(interaction, client) {


        await interaction.reply('Here is your question...');
        var result = trivia.start();

        await interaction.followUp(result);
    }
}