const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports = {
  data: {
    name: 'claim'
  },
  async execute(interaction, client) {
    const claim = new EmbedBuilder()
      .setColor(ticketcolor)
      .setTitle('Claimed Ticket')
      .setDescription(`Your ticket will be handled by ${interaction.user}`);
    const cls = new ButtonBuilder()
      .setCustomId('close')
      .setLabel('Close')
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger);
    const clsr = new ButtonBuilder()
      .setCustomId('closereason')
      .setLabel('Close with reason')
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger);
    interaction.message.edit({
      components: [
        new ActionRowBuilder().addComponents(cls, clsr),
      ]
    })
    await interaction.reply({
      embeds: [claim]
    })
      .catch(err => console.log(err));
    await interaction.client.Tickets.update({ claim_id: interaction.user.id }, {
      where: {
        channel_id: interaction.channelId
      }
    });
  }
}