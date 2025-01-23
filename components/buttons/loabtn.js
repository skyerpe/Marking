const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')
module.exports = {
  data: {
    name: 'loarequest'
  },
  async execute(interaction, client) {
    
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('loareq')
      .setTitle('LOA Request');
    // Add components to modal
    // Create the text input components
    const loaDuritionInput = new TextInputBuilder()
      .setCustomId('Durition')
      // The label is the prompt the user sees for this input
      .setLabel("Durition")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("LOA Duriton , e.g.\"\"")
      .setMaxLength(1024)
      .setRequired(true);
    const loaReasonInput = new TextInputBuilder()
      .setCustomId('Reason')
      // The label is the prompt the user sees for this input
      .setLabel("Reason")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Reason for LOA")
      .setMaxLength(1024)
      .setRequired(true);
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(loaDuritionInput);
    const secActionRow = new ActionRowBuilder().addComponents(loaReasonInput);
    // Add inputs to the modal
    modal.addComponents(firstActionRow,secActionRow);
    // Show the modal to the user
    await interaction.showModal(modal);
  }
}