const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('oops')
    .setDescription('Rolls on the oops table'),
  async execute(interaction) {
    await interaction.reply(global.game.oops());
  },    
};
