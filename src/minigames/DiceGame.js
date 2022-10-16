const discord = require('discord.js')
const mongoose = require('mongoose');
const MatchHistory = require(`../models/MatchHistory`);

mongoose
    .connect(process.env.DB_URI)
    .then(console.log('Sucessfully connected to the database'))
    .catch((e) => {
        console.log('error caught');
        console.log(e)
    })

class DiceGame {

    start() {
        //var result = "Dice game test run 1";
        var result = this.rollDice();
        return result;
    }

    rollDice() {
        var diceRoll = Math.floor((Math.random() * 100) + 1);
        var message = '';
        var playerWin = false;

        if (diceRoll >= 55) {
            playerWin = true;
        }

        MatchHistory.findOne({}).then(e => {
            if (playerWin) {
                e.player_wins += 1;
            } else {
                e.bot_wins += 1;
            }
            e.save();
        });

        if (playerWin) {
            message = "Dice Roll: " + diceRoll.toString() + " - Player Wins.";
            return message;
        } else {
            message = "Dice Roll: " + diceRoll.toString() + " - House  Wins.";
            return message;
        }
    }
}

module.exports = DiceGame;
