const ScrambleWords = require(`../models/ScrambleWordsLeaderboard`);
const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const words = fs.readFileSync("./1000words.txt", "utf8").split("\n");

class Scramble {
  async start(destination, interaction) {
    this.play(destination, interaction);
  }

  // Shuffles a word
  shuffle(s) {
    var a = s.split(""),
      n = a.length;

    for (var i = n - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join("");
  }

  //   Adds the user who played to our leaderboard
  async addToLeaderBoard(correct_words, correct_user) {
    const new_leaderboard_entry = new ScrambleWords({
      words: correct_words,
      user: correct_user,
    });
    await new_leaderboard_entry.save(function (err, entry) {
      if (err) return console.error(err);
      console.log(entry);
    });
  }

  //   Initates the game
  async play(destination, interaction) {
    let numCorrect = 0;
    let numScrambles = 1;
    let random_word;
    let author;
    let correct_words = [];
    // Getting first random word
    random_word = words[Math.floor(Math.random() * 1000)]
      .replace(/[\r\n]/gm, "")
      .toLowerCase();
    // Srambling our first random word and sending to user
    let newScramble = this.shuffle(random_word).toLowerCase();
    const embed = new EmbedBuilder().addFields({
      name: `Word Scramble #${numScrambles}:`,
      value: `${newScramble}`,
      inline: true,
    });
    destination.send({ embeds: [embed] });

    // Iniaiates our collector
    const filter = (m) => !m.author.bot;
    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 30000,
    });
    collector.on("collect", (m) => {
      // User can end scramble game by typing quit
      if (m.content.toLowerCase() === "quit") {
        collector.stop("User canceled");
        // User enters in the correct unscrambling of the word
      } else if (m.content.toLowerCase() === random_word) {
        numCorrect++;
        // Stores the user getting correct answer and each word they are getting correct
        correct_words.push(random_word);
        author = m.author.username;
        destination.send(`${m.author} was correct!`);
        numScrambles++;
        // Get new random word, scramble word, and send to user
        random_word = words[Math.floor(Math.random() * 1000)]
          .replace(/[\r\n]/gm, "")
          .toLowerCase();
        newScramble = this.shuffle(random_word).toLowerCase();
        let newEmbed = new EmbedBuilder().addFields({
          name: `Word Scramble #${numScrambles}:`,
          value: `${newScramble}`,
          inline: true,
        });
        destination.send({ embeds: [newEmbed] });
        // User enters in the incorrect unscrambling of the word
      } else {
        destination.send("Incorrect! Try again!");
      }
    });

    // When user times up, add them to leaderboard and let them know they out of time
    collector.on("end", (collected) => {
      this.addToLeaderBoard(correct_words, author);
      destination.send(`Time is up! You answered ${numCorrect} correctly!`);
    });
  }
}

module.exports = Scramble;
