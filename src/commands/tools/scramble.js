// word scramble
const { SlashCommandBuilder } = require("discord.js");
const Scramble = require("../../minigames/Scramble.js");
const scramble = new Scramble();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("scramble")
    .setDescription("Unscramble the displayed words to win!"),

  async execute(interaction, client) {
    await interaction.reply(
      "Scramble Time! You have 30 seconds to unscramble as many words as you can! Good luck!"
    );
    let destination = interaction.channel;
    scramble.start(destination, interaction);
  },
};
