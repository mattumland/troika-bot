const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw-token')
    .setDescription('Removes a token for them stack and adds it to current turn'),
  async execute(interaction) {
    global.game.drawToken();
    await interaction.reply(`${global.game.currentTurn}`)
  },    
};
