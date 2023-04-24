const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('Returns the contents of the game object'),
  async execute(interaction) {
    const pcs = global.game.displayPcs();
    const defaultStack = global.game.default;
    const currentStack = global.game.currentStack;
    const currentTurn = global.game.currentTurn;
    await interaction.reply(`PCs: ${pcs}\ndefaultStack: ${defaultStack.replaceAll(',', ', ')}\ncurrentStack: ${currentStack.replaceAll(',', ', ')}\ncurrentTurn: ${currentTurn}`);
  },  
};  
