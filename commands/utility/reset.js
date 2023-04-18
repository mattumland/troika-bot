const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reset')
		.setDescription('Erases all game data.'),
	async execute(interaction) {
    global.game.reset();
		await interaction.reply('Game data reset.');
	},
};
