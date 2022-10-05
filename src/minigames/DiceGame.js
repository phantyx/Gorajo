// WORK IN PROGRESS - DOES NOT WORK


const mongoose = require('mongoose');
const MatchHistory = require(`../models/MatchHistory`);

mongoose
    .connect(process.env.DB_URI)
    .then(console.log('Sucessfully connected to the database'))
    .catch((e) => {
        console.log('error caught');
        console.log(e)
    })

function rollDice() {
    var diceRoll = Math.floor(Math.random() * 100);
    var message = '';
    MatchHistory.findOne({}).then(e => {
        if (diceRoll >= 55) {
            e.player_wins += 1;
            message = `Dice Roll: ${diceRoll} - Player Wins.`
        } else {
            e.bot_wins += 1;
            message = `Dice Roll: ${diceRoll} - House Wins.`
        }
        e.save();
    });
    return message;
}

