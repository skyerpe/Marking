const { SlashCommandBuilder,PermissionFlagsBits,EmbedBuilder } = require('discord.js');
const { request } = require('undici');
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName('eventid')
		.setDescription('Create an event announcement')
    .addIntegerOption(option =>
			option
				.setName('eventid') 
			  .setDescription('The Event ID which invite us to partcipate')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .setDMPermission(false),
	async execute(interaction) {
    interaction.deferReply();
    const term = interaction.options.getInteger('eventid');
		const dictResult = await request(`https://api.truckersmp.com/v2/events/${term}`);
		const { response,error } = await dictResult.body.json();
    if(error===false){
      interaction.deleteReply();
      const text = response.description;
      const des1 = text.replace(/!\[.*?\]\(.*?\)/g,' ');
      const des2 = des1.replace('\r\n\r\n \r\n\r\n','\n\n');
      const convoy1 = new EmbedBuilder()
        .setColor(ticketcolor)
        .setTitle( response.name )
        .setURL('https://truckersmp.com/events/'+response.id)
        .setDescription(des2)
      interaction.guild.channels.fetch('929319867457347636')
        .then(channel => channel.send({
          embeds: [convoy1],
        }));
      }
      else{
      interaction.editReply('**Event not found!**');
      }
  }
};
