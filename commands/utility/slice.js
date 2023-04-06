const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slice')
		.setDescription('Replies with Death Instantaneous!'),
	async execute(interaction) {
		await interaction.reply('Death Instantaneous!');
	},
};
