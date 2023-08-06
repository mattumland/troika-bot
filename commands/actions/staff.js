const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { damageTable } = require('../../data/damage.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('staff')
    .setDescription('Rolls damage for a staff weapon')
    .addIntegerOption(option =>
      option.setName('modifier')
      .setDescription('The modifier of the damage roll')
      .setRequired(true)),
  async execute(interaction) {
    const modifier = interaction.options.getInteger('modifier');
    const result = global.game.damage('staff', modifier);

    const damageEmbed = new EmbedBuilder()
      .setColor('Red')
      .setTitle(`${result.toString()} damage`)

    await interaction.reply({ embeds: [damageEmbed] })
      .catch(console.error)
  }
}
