const { SlashCommandBuilder,PermissionFlagsBits } = require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
		.setName('send')
    .setDescription('add')
    .addIntegerOption(option =>
      option
        .setName('eventid')
        .setDescription('ID of event.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
		.setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();
    const eventid = interaction.options.getInteger('eventid');
    const response = await fetch(`https://api.truckersmp.com/v2/events/${eventid}`, {
      headers: {
        "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
      }
    });
    const data = await response.json();
    const event_id = data.response.id;
    const event_name = data.response.name;
    const event_timemt = data.response.meetup_at;
    const event_timest = data.response.start_at;
    const event_dep = `${data.response.departure.city}(${data.response.departure.location})`;
    const event_des = `${data.response.arrive.city}(${data.response.arrive.location})`;
    await interaction.client.TMPEvents.create({ event_id,event_name,event_timemt,event_timest,event_dep,event_des });
// Wait for all the database updates to be finished
    console.log('Database synced');
    await interaction.editReply('Synced');
    return;
  },
};