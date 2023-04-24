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
      global.game.currentTurn = ''
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
        content: 'End of Turn.\nWould you like to reuse the previous stack or build a new stack?',
        components: [row]
      });

      const stackConfirmation = await response.awaitMessageComponent();

      if (stackConfirmation.customId === 'reuse') {
        global.game.currentStack = global.game.defaultStack;
        global.game.currentTurn = '';
        await stackConfirmation.reply('Previous stack is reset.')
      } else {
          const createStackModal  = new ModalBuilder()
              .setCustomId('createStack')
              .setTitle('Create New Stack')
            
          const pcInput = new TextInputBuilder()
            .setCustomId('pcs')
            .setLabel('Confirm the list of PCs')
            .setValue(`${global.game.displayPcs()}`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

          const enemyCountInput = new TextInputBuilder()
            .setCustomId('enemyCount')
            .setLabel('How many enemy tokens?')
            .setValue('1')
            .setStyle(TextInputStyle.Short)
            .setRequired(true);

          const pcInputRow = new ActionRowBuilder().addComponents(pcInput);
          const enemyInputRow = new ActionRowBuilder().addComponents(enemyCountInput);

          createStackModal.addComponents(pcInputRow, enemyInputRow);

          await stackConfirmation.showModal(createStackModal);

          const filter = (stackConfirmation) => stackConfirmation.customId === 'createStack';
          
          await stackConfirmation.awaitModalSubmit({ filter, time: 15_000 })
            .then(interaction => {
              global.game.pcs = interaction.fields.getTextInputValue('pcs');
              const enemyCount = parseInt(interaction.fields.getTextInputValue('enemyCount'));
              if (enemyCount < 0) {
                  interaction.reply({ content: 'Stack not created - You must enter a number greater than 0' });
              } else {
                global.game.createStack(enemyCount);
                interaction.reply({ content: 'New stack created. Good luck!' });
              }
            })
            .catch(err => console.log('No modal submit interaction was collected'));
      }   
    }
  },    
};
