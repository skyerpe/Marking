const { ContextMenuCommandBuilder,ApplicationCommandType,EmbedBuilder } = require('discord.js');
const { ticketcolor } = require("../config/plugins/ticket.json");
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('LOA Accept')
  	.setType(ApplicationCommandType.Message),
async execute(interaction) {
  const message = interaction.targetMessage;
  const staff = interaction.member;
  const member = message.member;
  const nick = await interaction.client.Staffs.findOne({where:{userid:`${member.id}`}});
  const acinfo = new EmbedBuilder()
  .setColor(ticketcolor)
  .setTitle(`LOA Accepted`)
  .setFields(
    {name:'Staff Name : ',value:`${member.user.displayName}`},
    {name:'Date : ',value:`${dur}`},
  )
  .setFooter({ text: `${staff.id}`, iconURL: `${staff.user.displayAvatarURL({size:4096})}` });
  if (nick === null) {
  	console.log('Not found!');
  } else {
    await member.roles.add('1187772116767100979');
		await member.edit({nick:`☆ • LOA | `+ nick.nickname});
    await message.react('1194973214724587540');
    await 
    interaction.guild.channels.fetch('1298663853130907799')
			.then(channel => channel.send({
				embeds: 
				[acinfo],
			}));
  }
},
};