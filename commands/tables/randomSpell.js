const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('random-spell')
    .setDescription('Rolls on the random spell table'),
  async execute(interaction) {
    await interaction.reply(global.game.randomSpell());
  },    
};
