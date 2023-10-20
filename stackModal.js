const { ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');

const NewStackModal = async (interaction) => {
  const createStackModal  = new ModalBuilder()
        .setCustomId('createStack')
        .setTitle('Create New Stack')
      
  const pcInput = new TextInputBuilder()
    .setCustomId('pcs')
    .setLabel('List the PCs, separated by commas')
    .setValue(`${global.game.displayPcs()}`)
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const enemyCountInput = new TextInputBuilder()
    .setCustomId('enemyCount')
    .setLabel('How many enemy tokens?')
    .setValue('1')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const henchmanCountInput = new TextInputBuilder()
    .setCustomId('henchCount')
    .setLabel('How many henchman tokens?')
    .setValue('0')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const pcInputRow = new ActionRowBuilder().addComponents(pcInput);
  const enemyInputRow = new ActionRowBuilder().addComponents(enemyCountInput);
  const henchmanInputRow = new ActionRowBuilder().addComponents(henchmanCountInput);

  createStackModal.addComponents(pcInputRow, enemyInputRow, henchmanInputRow);

  await interaction.showModal(createStackModal);

  const filter = (interaction) => interaction.customId === 'createStack';
    
  await interaction.awaitModalSubmit({ filter, time: 15_000 })
    .then(interaction => {
      global.game.pcs = interaction.fields.getTextInputValue('pcs');
      const enemyCount = parseInt(interaction.fields.getTextInputValue('enemyCount'));
      const henchCount = parseInt(interaction.fields.getTextInputValue('henchCount'));

      if (enemyCount < 0) {
        interaction.reply({ content: 'Stack not created - You must enter a number greater than 0' });
      } else {
        global.game.createStack(enemyCount, henchCount);
        interaction.reply({ content: 'New stack created. Good luck!' });
      }
    })
    .catch(err => console.log('No modal submit interaction was collected'));
}

module.exports = { NewStackModal }
