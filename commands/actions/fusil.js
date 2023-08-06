const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { damageTable } = require('../../data/damage.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fusil')
    .setDescription('Rolls damage for a fusil weapon')
    .addIntegerOption(option =>
      option.setName('modifier')
      .setDescription('The modifier of the damage roll')
      .setRequired(true)),
  async execute(interaction) {
    const modifier = interaction.options.getInteger('modifier');
    const result = global.game.damage('fusil', modifier);

    const damageEmbed = new EmbedBuilder()
      .setColor('Red')
      .setTitle(`${result.toString()} damage`)
      .addFields(
        {name: 'Note', value: 'Ignores 1 point of armor'}
      )

    await interaction.reply({ embeds: [damageEmbed] })
      .catch(console.error)
  }
}
