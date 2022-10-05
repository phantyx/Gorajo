const mongoose = require('mongoose');

const MatchHistorySchema = new mongoose.Schema({
    bot_wins: {
        type: Number,
        required: true
    },
    player_wins: {
        type: Number,
        required: true
    }
})

module.exports = MatchHistory = mongoose.model("MatchHistory", MatchHistorySchema)