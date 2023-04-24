const { SlashCommandBuilder, ActionRowBuilder, TextInputBuilder, TextInputStyle, ModalBuilder } = require('discord.js');
const { NewStackModal } = require('../../stackModal.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stack')
    .setDescription('Creates the initiative stack'),
  async execute(interaction) {
    NewStackModal(interaction);
  },    
};
