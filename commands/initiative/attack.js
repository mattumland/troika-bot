const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { randomImage } = require('../../randomImage.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('attack')
    .setDescription('Prompts the user for a modifier then returns an attack roll')
    .addIntegerOption(option =>
      option.setName('modifier')
      .setDescription('The modifier of the attack roll')
      .setRequired(true)),
  async execute(interaction) {
    const modifier = interaction.options.getInteger('modifier');
    const result = global.game.attack(modifier);

    const attackEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle(result.total.toString())
      .addFields(
        { name: 'Roll', value: result.roll.toString(), inline: true },
        { name: 'Modifier', value: result.modifier.toString(), inline: true }
      )
    if (result.total === "Mighty Blow!") {
      attackEmbed.setImage(randomImage())
    }

    await interaction.reply({ embeds: [attackEmbed] })
      .catch(console.error)
  },
};
