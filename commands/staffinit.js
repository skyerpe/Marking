const {InteractionContextType, SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
		.setName('staffinit')
    .setDescription('add')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents)
		.setContexts(InteractionContextType.Guild),
  async execute(interaction) {
    await interaction.deferReply();
// Get an array of the roles we're interested in
    const response = await interaction.guild.roles.fetch('1224381394428498063')
    .then(role => role.members)
    .catch(console.error);

    const promises2 = response.map(member => {
    const botst = member.user.bot;
      if (botst == true){
        return;
      } else {
        const nick = member.displayName;
        const nickname = nick.replace(/☆ • |TMP \| |GMs \| |TCC \| |LOA \| /ig,"","");
        const userid = member.user.id;
        interaction.client.Staffs.upsert({
            userid,
            nickname
        });
        return;
      }
    });
    await Promise.all(promises2);
// Wait for all the database updates to be finished
      console.log('Database synced');
      await interaction.editReply('Synced');
  },
};