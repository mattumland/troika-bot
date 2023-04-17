const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('current-turn')
		.setDescription('Replies with the current turn'),
	async execute(interaction) {
    const currentTurn = global.game.currentTurn || 'No one is currently acting. Type `build-stack` to set up an initiative stack.'
		await interaction.reply(`${currentTurn}`);
	},
};
