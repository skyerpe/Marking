const {EmbedBuilder}= require('discord.js')
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports = {
  data: {
    name:'clsres'
  },
  async execute(interaction,client) {
    const reason = interaction.fields.getTextInputValue('Reason');
    const res = new EmbedBuilder()
		.setColor(ticketcolor)
		.setTitle(`Ticket Closed`)
    .setFields(
      {name:'❓Reason',value:`${reason}`}
    );
    interaction.guild.channels.fetch('1129034159667544065')
			.then(channel => channel.send({
				embeds: 
				[res],
			}));
    await interaction.deferReply();
    await interaction.deleteReply();
    await interaction.channel.delete();
  }
}