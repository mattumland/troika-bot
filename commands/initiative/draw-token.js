const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { NewStackModal } = require('../../stackModal.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('draw-token')
    .setDescription('Removes a token for them stack and adds it to current turn'),
  async execute(interaction) {
    global.game.drawToken();
    if (global.game.currentTurn !== 'End of the Round') {
      const turnEmbed = new EmbedBuilder()
      .setTitle(global.game.currentTurn)
      if (global.game.currentTurn === 'Enemy') {
        turnEmbed.setColor('Red')
      } else if (global.game.currentTurn === 'Henchman') {
        turnEmbed.setColor('Green')
      } else {
        turnEmbed.setColor('Blurple')
      }
      await interaction.reply({ embeds: [turnEmbed] })
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
        content: '**End of the Round**.\nWould you like to reuse the previous stack or build a new stack?',
        components: [row]
      });

      const collectorFilter = i => i.user.id === interaction.user.id;

      const stackConfirmation = await response.awaitMessageComponent({ filter: collectorFilter });

      if (stackConfirmation.customId === 'reuse') {
        global.game.currentStack = global.game.defaultStack;
        global.game.currentTurn = '';
        await stackConfirmation.reply('Previous stack is reset.')
      } else {
        NewStackModal(stackConfirmation);
      }   
    }
  },    
};
