const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('game')
    .setDescription('Returns the contents of the game object'),
  async execute(interaction) {
    const pcs = global.game.displayPcs();
    const defaultStack = global.game.default.StackreplaceAll(',', ', ');
    const currentStack = global.game.currentStack.StackreplaceAll(',', ', ');
    const currentTurn = global.game.currentTurn;
    await interaction.reply(`PCs: ${pcs}\ndefaultStack: ${defaultStack}\ncurrentStack: ${currentStack}\ncurrentTurn: ${currentTurn}`);
  },  
};  
