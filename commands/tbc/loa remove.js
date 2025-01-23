const { ContextMenuCommandBuilder,ApplicationCommandType } = require('discord.js');
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('LOA Remove')
  	.setType(ApplicationCommandType.Message),
async execute(interaction) {
	interaction.deferReply();
  const message = interaction.targetMessage;
  const member = message.member;
  const nick = await interaction.client.Staff.findOne({where:{userid:`${member.id}`}});
  if (nick === null) {
  	console.log('Not found!');
		interaction.editReply({content:'Can\'t find the Staff',ephemeral: true });
  } else {
		await member.roles.remove('1187772116767100979');	
		await member.edit({nick:`☆ • `+ nick.nickname});
		await interaction.deleteReply();
  }
},
};