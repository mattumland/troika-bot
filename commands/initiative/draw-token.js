const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw-token')
    .setDescription('Removes a token for them stack and adds it to current turn'),
  async execute(interaction) {
    global.game.drawToken();

    if (global.game.currentTurn !== 'End of Turn') {
      await interaction.reply(`${global.game.currentTurn}`)
    } else {
      const reuse = new ButtonBuilder()
        .setCustomId('reuse')
        .setLabel('Reuse previous stack')
        .setStyle(ButtonStyle.Primary);

      const rebuild = new ButtonBuilder()
        .setCustomId('rebuild')
        .setLabel('Build new stack')
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder()
        .addComponents(reuse, rebuild);

      const response = await interaction.reply({
        content: 'Would you like to reuse the previous stack or build a new stack?',
        components: [row],
        ephemeral: true 
      });

      const stackConfirmation = await response.awaitMessageComponent();

      if (stackConfirmation.customId === 'reuse') {
        global.game.currentStack === global.game.defaultStack;
        global.game.currentTurn === '';
        await stackConfirmation.reply('Stack is ready. Good luck!')
      } else {
        const newStackModal  = new ModalBuilder()
          .setCustomId('newStack')
          .setTitle('Create New Stack')
        
        const pcInput = new TextInputBuilder()
          .setCustomId('pcs')
          .setLabel('Confirm the list of PCs')
          .setValue(`${global.game.pcs}`)
          .setStyle(TextInputStyle.Short);

        const enemyCountInput = new TextInputBuilder()
          .setCustomId('enemyCount')
          .setLabel('How many enemy tokens?')
          .setValue('0')
          .setStyle(TextInputStyle.Short);

        const pcInputRow = new ActionRowBuilder().addComponents(pcInput);
        const enemyInputRow = new ActionRowBuilder().addComponents(enemyCountInput);

        newStackModal.addComponents(pcInputRow, enemyInputRow);

        await stackConfirmation.showModal(newStackModal);
        
        const pcList = stackConfirmation.fields.getTextInputValue('pcInput');
	      const enemyCount = parseInt(stackConfirmation.fields.getTextInputValue('enemyCountInput'));
        
        if (enemyCount === NaN) {
          await stackConfirmation.followUp({ content: 'You didn`t input a number of enemy tokens. Please type `/stack` to build a new stack.' });
        }

        global.game.pcs = pcList; 
        global.game.createStack(enemyCount);

        await stackConfirmation.followUp({ content: 'New stack created. Good luck!' });
      }   
    }
  },    
};
