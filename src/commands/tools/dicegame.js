const { SlashCommandBuilder } = require('discord.js');
const DiceGame = require('../../minigames/DiceGame.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dicegame')
        .setDescription('Starts the dice game.'),
    async execute(interaction, client) {
        // const message = await interaction.deferReply({
        //     fetchReply: true
        // });

        //GET FILE FROM DIRECTORY
        //CALL FUNCTION
        await interaction.reply('Rolling dice...');
        var result = rollDice();

        await interaction.followUp("Dice Roll: 23 - House Wins.");
    }
}

function rollDice() {
    var diceRoll = Math.floor((Math.random() * 100) + 1);
    var message = '';
    MatchHistory.findOne({}).then(e => {
        if (diceRoll >= 55) {
            e.player_wins += 1;
            message = "Dice Roll: " + diceRoll.toString() + " - Player Wins.";
            console.log(message);
        } else {
            e.bot_wins += 1;
            message = "Dice Roll: " + diceRoll.toString() + " - House  Wins.";
            console.log(message);
        }
        e.save();
        return message;
    });
}
