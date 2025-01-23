const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js')
module.exports = {
  data: {
    name: 'booking'
  },
  async execute(interaction, client) {
    // Create the modal
    const modal = new ModalBuilder()
      .setCustomId('sptic')
      .setTitle('Event Submission');
    // Add components to modal
    // Create the text input components
    const favoriteColorInput = new TextInputBuilder()
      .setCustomId('Eventid')
      // The label is the prompt the user sees for this input
      .setLabel("What's the ID of your VTC's event?")
      // Short means only a single line of text
      .setStyle(TextInputStyle.Short);
    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
    // Add inputs to the modal
    modal.addComponents(firstActionRow);
    // Show the modal to the user
    await interaction.showModal(modal);
  }
}