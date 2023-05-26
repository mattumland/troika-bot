const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('current-turn')
		.setDescription('Replies with the current turn'),
	async execute(interaction) {
    const currentTurn = `It is ${global.game.currentTurn}'s turn` || 'No one is currently acting. Type `build-stack` to set up an initiative stack.'
		const turnEmbed = new EmbedBuilder()
      .setTitle(currentTurn)
      if (global.game.currentTurn=== 'Enemy') {
        turnEmbed.setColor('Red')
      } else if (global.game.currentTurn === 'Henchman') {
        turnEmbed.setColor('Green')
      } else {
        turnEmbed.setColor('Blurple')
      }
		await interaction.reply({ embeds: [turnEmbed] });
	},
};
