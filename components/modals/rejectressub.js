const {EmbedBuilder}= require('discord.js')
module.exports = {
  data: {
    name:'rejres'
  },
  async execute(interaction,client) {
    const reason = interaction.fields.getTextInputValue('Reason');
    interaction.channel.edit({ name: `🔴-${cm}` });
    await interaction.channel.send(`Status of this ticket has been changed to \`🔴\` - **\`REFUSE\`**,

Thank you very much for choose us Marking Event!
Unfortunately the time does not match, and we are unable to participate.

Due to ${reason}
We still wish you a successful outcome with your convoy and event!

Please do not message us about these things, Thanks for your choose us understanding! 
${userid}
          
**Kind Regards,**
**${member}**
**Marking | Event Management**`);
    await interaction.deferReply();
    await interaction.deleteReply();
  }
}