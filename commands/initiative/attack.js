const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('attack')
    .setDescription('Prompts the user for a modifier then returns an attack roll')
    .addIntegerOption(option =>
      option.setName('modifier')
      .setDescription('The modifier of the attack roll')
      .setRequired(true)),
  async execute(interaction) {
    const modifier = interaction.options.getInteger('modifier');
    await interaction.reply(global.game.attack(modifier).toString());
  },
};
