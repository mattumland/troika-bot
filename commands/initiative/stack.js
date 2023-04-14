const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stack')
    .setDescription('Creates the initiative stack')
    .addIntegerOption(option => 
      option.setName('how-many-enemy-tokens')
      .setDescription('The number of enemy tokens to be added to the stack')
      .setRequired(true)),
  async execute(interaction) {
    const enemyCount = interaction.options.getInteger('how-many-enemy-tokens', true);
    global.game.createStack(enemyCount);
    await interaction.reply('The stack is ready. Enter `draw-token` to see who is first. ')
  },    
};
