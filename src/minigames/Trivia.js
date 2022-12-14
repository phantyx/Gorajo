const { EmbedBuilder } = require("discord.js");
const fs = require("fs");
const words = fs.readFileSync("./1000words.txt", "utf8").split("\n");

const questionA = "The term \"battery\" to describe an electrical storage device was coined by?";
const answerA = "Benjamin Franklin";

class Trivia {
  async start(destination, interaction) {
    this.questionInstance(destination, interaction, questionA, answerA);
  }

  async questionInstance(destination, interaction, question, answer) {
    let count = 1;
    let attempts = 0;
    let questions = [];
    let score = [];
    let author;

    destination.send({ embeds: [generateQuestionEmbed(question, count)] });

    const filter = (m) => !m.author.bot;
    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 30000,
    });
    collector.on("collect", (m) => {
      // User can end scramble game by typing quit
      if (m.content.toLowerCase() === "quit") {
        collector.stop("User canceled");
        // User enters in the correct answer to the question
      } else if (m.content.toLowerCase() === answer.toLowerCase()) {
        attempts++;
        // Stores the user getting correct answer, the number of attempts for each question, and the question itself.
        questions.push(question);
        score.push(attempts);
        author = m.author.username;

        destination.send({ embeds: [generateTrueEmbed(true, count)] });
        count++;
        // Get new random word, scramble word, and send to user
          //Add randomizer code
        // generates a new question and continues
        destination.send({ embeds: [generateQuestionEmbed(question, count)] });
        // User enters in the incorrect answer to the question
      } else {
        attempts++;
        destination.send({ embeds: [generateTrueEmbed(false, count)] });
      }
    });

    collector.on("end", (collected) => {
      this.addToLeaderBoard(correct_words, author);
      destination.send(`Time is up! You answered ${numCorrect} correctly!`);
    });
  }
}

function generateQuestionEmbed(question, count) {
  const embed = {
  title: 'Trivia Question #' + count,
  description: question,
  };
  return embed;
}

function generateTrueEmbed(bool, count) {
  let response = "Incorrect! Try Again!";
  if (bool === true) {
    response = "Correct!";
  }
  const embed = new EmbedBuilder()
  .setTitle('Trivia Question #' + count)
  .setDescription(response);
  return embed;
}

module.exports = Trivia;
