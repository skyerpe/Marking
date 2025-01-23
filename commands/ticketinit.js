const { InteractionContextType,ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { ticketcolor } = require("../config/plugins/ticket.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticketinit')
    .setDescription('Init the ticket message')
		.setContexts(InteractionContextType.Guild),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.deleteReply();
    const eventtic = new EmbedBuilder()
      .setColor(ticketcolor)
      .setTitle('Booking us')
      .setDescription('If you are interested in booking our supervisory team, By clicking the button, a ticket will be opened for you with the Event Management.\n\n <a:warn:1253967391008751688> Note: When you open this ticket, it means that you have confirmed our rules. If you violate the above rules, you will be punished by our event management team, but the final decision lies with them!');
    const create = new ButtonBuilder()
      .setCustomId('booking')
      .setLabel('Booking Us')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('1194974971403968513');
    const row1 = new ActionRowBuilder()
      .addComponents(create);
    await interaction.channel.send({
      embeds: [eventtic],
      components: [row1],
    });
  },
};