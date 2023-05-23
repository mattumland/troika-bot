const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { exampleEmbed } = require('../../embed.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('slice')
		.setDescription('Replies with Death Instantaneous!'),
	async execute(interaction) {
		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Death Instantaneous!')
			.addFields(
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true },
				{ name: 'Inline field title', value: 'Some value here', inline: true }
			)

		await interaction.reply({ embeds: [embed] })
			// .then(() => console.log('Reply sent.'))
			// .catch(console.error);
			},
};
