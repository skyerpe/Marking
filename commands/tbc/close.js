const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');
const { AUTO_TICKET_LOGchannel } = require('../../config/plugins/ticket.json');

module.exports={
    data: new SlashCommandBuilder()
		.setName('close')
    .setDescription('close'),
  async execute(interaction) {
		interaction.options.getChannel()
		interaction.channel.delete('The ticket closed')
		await interaction.reply({content: `${interaction.user.username} closed the ticket${interaction.channel.id}`,ephmeral:true});
		},
	};