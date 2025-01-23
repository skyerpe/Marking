const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  userPerms: [],
  botPerms: [],

  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add someone to the ticket (Ticket Command) ')
    .setDMPermission(false)
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Member to add to ticket')
        .setRequired(true)),
  async execute(interaction,client) {
    //log
    const commandName = "ADD";
      client.std_log.error(client, commandName, interaction.user.id, interaction.channel.id);
    const chan = client.channels.cache.get(interaction.channelId);
    const user = interaction.options.getUser('target');
    const userID = user.id;
    let Support_Role;
    function Fivem() {
      return Support_Role = client.ticket.FIVEM_TICKET.ROLE_SUPPORT.ID;
      }
      function Redm() {
      return Support_Role = client.ticket.REDM_TICKET.ROLE_SUPPORT.ID;
      }
    if (interaction.guild.id == client.ticket.FIVEM_TICKET.GUILDID) {
      Fivem();
    } else if (interaction.guild.id == client.ticket.REDM_TICKET.GUILDID) {
      Redm();
    } else {
      return;
    }
    if (chan.name.includes('ticket')) {
      chan.edit({
        permissionOverwrites: [
          {
            id: userID,
            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
          },
          {
            id: interaction.guild.roles.everyone,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: Support_Role,
            allow: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel],
          },
        ],
      }).then(async () => {
        interaction.reply({
          content: `<@${user.id}> has been added to the ticket!`
        });
      });
    } else {
      const ReplyEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription('You are not in a Ticket!')
      await interaction.reply({
        embeds: [ReplyEmbed],
        ephemeral: true
      });
    };
  },
};