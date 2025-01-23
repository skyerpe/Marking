const {EmbedBuilder, ActionRowBuilder,ButtonBuilder,ButtonStyle}=require('discord.js')
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports={
  data:{
    name:'close'
  },
  async execute(interaction,client){
    const uname = interaction.member.displayName;
    const avatar = interaction.member.displayAvatarURL();
    const close = new EmbedBuilder()
      .setAuthor({name:`${uname}`,iconURL:`${avatar}`})
      .setColor(ticketcolor)
      .setTitle(`Close Cinfirmation`)
      .setDescription(`Please confirm that you want to close this ticket`);
    const confirm = new ButtonBuilder()
      .setCustomId('clscfm')
      .setLabel('Confirm')
      .setStyle(ButtonStyle.Primary);
    await interaction.reply({
      embeds: [close],
      components: [new ActionRowBuilder().addComponents(confirm)],
      ephemeral: true,
    });
  }
}