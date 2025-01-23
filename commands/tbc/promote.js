const {  InteractionContextType ,SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, WebhookClient } = require('discord.js');
const {  RoleID, webhookId, webhookToken } = require('../config/plugins/promote.json');
const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('promote')
		.setDescription('Select a member and promote them.')
		.addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to promote')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('position')
				.setDescription('The position for pormoting')
        .setRequired(true)
				.addChoices(
					{ name: 'Convoy Control', value: 'CC' },
					{ name: 'Media Team', value: 'Media' },
					{ name: '123', value: 'Driver' },
					{ name: 'Convoy Control Trainee', value: 'Trainee' },
				))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.setContexts(InteractionContextType.Guild),
  async execute(interaction) {
		const member = interaction.options.getMember('target');
		const avatarURL = member.user.displayAvatarURL({size:4096});
		const userID = member.id;
		const position = interaction.options.getString('position');
		const success = new EmbedBuilder()
		.setColor(ticketcolor)    
		.setThumbnail(avatarURL)
		.setTitle(`Member Role Change`);
		const error = new EmbedBuilder()
		.setColor('Red')    
		.setTitle(`Error`)
		.setDescription(`Commmand error`);
		function CC() {
			interaction.deferReply();
			interaction.deleteReply();
			member.roles.add('931587922195525652');
			member.roles.add('1224381394428498063');
			interaction.guild.channels.fetch('1147608662974664704')
			.then(channel => channel.send({
				embeds: 
				[success
					.setDescription(`**<@${userID}>** has promoted to **<@&${RoleID.CC}>**`)
					.setImage('https://cdn.discordapp.com/attachments/929319867457347636/1103853149745332285/ZmT1EEV2.png')
				],
			}));
		}
		function Driver() {
			member.roles.add(RoleID.Driver);
			member.roles.add(RoleID.Devide3)
			member.roles.remove(RoleID.Trainee);
			webhookClient.send({
				embeds: 
				[success
					.setDescription(`**<@${userID}>** has promoted to **<@&${RoleID.Driver}>**`)
				],
			});
			interaction.reply({ content: 'Success!', ephemeral: true });
		}
		function Media() {
			member.roles.add(RoleID.Devide1);
			member.roles.add(RoleID.Media);
			webhookClient.send({
				embeds: 
				[success
					.setDescription(`**<@${userID}>** has promoted to **<@&${RoleID.Media}>**`)
				],
			});
			interaction.reply({ content: 'Success!', ephemeral: true });
		}
		function Trainee() {
			member.roles.add(RoleID.Devide2);
			member.roles.add(RoleID.Trainee);
			webhookClient.send({
				embeds: 
				[success
					.setDescription(`**<@${userID}>** joins Federal Transport VTC as **<@&${RoleID.Trainee}>**`)
				],
			});
			interaction.reply({ content: 'Success!', ephemeral: true });
		}
		if (position == 'CC') {
			CC();
		} 
		else if (position == 'Media') {
			Media();
		} 
		else if (position == 'Driver') {
			Driver();
		} 
		else if (position == 'Trainee'){
			Trainee();
		} 
		else
		{
			interaction.reply(
				{embed:[error],
				});
			return;
		}
  },
};