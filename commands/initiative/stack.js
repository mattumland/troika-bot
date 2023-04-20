const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stack')
    .setDescription('Creates the initiative stack'),
  async execute(interaction) {
    // use message components to ask for enemy count and buttons for using the current pc list or writing a new pc list
    // if there are no PCs, prompt to enter pcs
    // if there are pcs, provide a button to use the current list
    // const enemyCount = interaction.options.getInteger('how-many-enemy-tokens', true);
    // global.game.createStack(enemyCount);
    // await interaction.reply('The stack is ready. Enter `draw-token` to see who is first. ')

    const createStackModal  = new ModalBuilder()
        .setCustomId('createStack')
        .setTitle('Create New Stack')
      
    const pcInput = new TextInputBuilder()
      .setCustomId('pcs')
      .setLabel('Confirm the list of PCs')
      .setValue(`${global.game.pcs}`)
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

    await interaction.showModal(createStackModal);

    const filter = (interaction) => interaction.customId === 'createStack';
    
    await interaction.awaitModalSubmit({ filter, time: 15_000 })
      .then(interaction => {
        global.game.pcs = interaction.fields.getTextInputValue('pcs');
        const enemyCount = parseInt(interaction.fields.getTextInputValue('enemyCount'));
        global.game.createStack(enemyCount);
        interaction.reply({ content: 'New stack created. Good luck!' });
      })
      .catch(err => console.log('No modal submit interaction was collected'));
  },    
};
