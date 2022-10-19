const mongoose = require("mongoose");

// Schema for our Scramble Words Game Leaderboard
const ScrambleWordsSchema = new mongoose.Schema({
  words: [String],
  user: String,
});

module.exports = ScrambleWords = mongoose.model(
  "ScrambleWords",
  ScrambleWordsSchema
);
