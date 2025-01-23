const {ticketsave }=require ("../../config/plugins/ticket.json")
module.exports = {
  data: {
    name: 'clscfm'
  },
  async execute(interaction, client) {
    interaction.guild.channels.fetch(ticketsave)
			.then(channel => channel.send('closed')
    );
    await interaction.deferReply();
    await interaction.deleteReply();
    await interaction.channel.delete();
    await interaction.client.Tickets.destroy({
      where: {
        channel_id: interaction.channelId
      }
    });
  }
}