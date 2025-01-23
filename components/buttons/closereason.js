const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle} = require('discord.js')
module.exports = {
  data: {
    name: 'closereason'
  },
  async execute(interaction, client) {
    
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('clsres')
      .setTitle('Close');
    // Add components to modal
    // Create the text input components
    const closeReasonInput = new TextInputBuilder()
      .setCustomId('Reason')
      // The label is the prompt the user sees for this input
      .setLabel("Reason")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Reason for closing the ticket, e.g.\"Resolved\"")
      .setMaxLength(1024)
      .setRequired(true);
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(closeReasonInput);
    // Add inputs to the modal
    modal.addComponents(firstActionRow);
    // Show the modal to the user
    await interaction.showModal(modal);
  }
}