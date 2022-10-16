const { SlashCommandBuilder } = require('discord.js');
const DiceGame = require('../../minigames/DiceGame.js');
const dicegame = new DiceGame();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dicegame')
        .setDescription('Starts the dice game.'),
    async execute(interaction, client) {


        await interaction.reply('Rolling dice...');
        var result = dicegame.start();

        await interaction.followUp(result);
    }
}
