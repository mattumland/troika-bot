const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delay')
    .setDescription('Returns the current turn token into the stack'),
  async execute(interaction) {
    if (global.game.currentTurn && global.game.currentTurn !== 'End of Turn') {
        const delay = new ButtonBuilder()
        .setCustomId('delay')
        .setLabel('Yes, delay my action')
        .setStyle(ButtonStyle.Primary);

      const nope = new ButtonBuilder()
        .setCustomId('nope')
        .setLabel('Nope, nevermind')
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder()
        .addComponents(delay, nope);

      const response = await interaction.reply({
        content: 'Are you sure you want to delay your action?',
        components: [row]
      });

      const delayConfirmation = await response.awaitMessageComponent();

      if (delayConfirmation.customId === 'delay') {
        const currentToken = global.game.currentTurn;
        global.game.delay();
        await delayConfirmation.reply(`${currentToken} has been returned to the stack.`);
      } else {
        await delayConfirmation.reply(`Alright ${global.game.currentToken}, it is your turn.`);
      }
    } else {
      await delayConfirmation.reply(`It's no one's turn at the moment.`);
    }
  },    
};
