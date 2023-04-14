const { SlashCommandBuilder } = require('discord.js');
const { removeWhiteSpace } = require('../../gameHelpers.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('enter-pcs')
    .setDescription('Prompts the user to enter the name of the PCs')
    .addStringOption(option => 
      option.setName('enter-pc-names-with-commas')
      .setDescription('The list of pcs to add to the game')
      .setRequired(true)),
  async execute(interaction) {
    const pcList = interaction.options.getString('enter-pc-names-with-commas', true);
    global.game.pcs = removeWhiteSpace(pcList);

    await interaction.reply(`${global.game.pcs} added to the game.`)
  },    
};
