const { EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, PermissionsBitField, ActionRowBuilder } = require('discord.js');
const { actualTime } = require('../../date/date.js');
const config = require("../../config/plugins/ticket.json");
const { EmbedColor } = require('../../config/main/config.json');

// 封装错误处理函数
function handleError(err, message) {
  console.log(err);
  console.log(message);
}

module.exports = {
  data: {
    name: 'sptic'
  },
  async execute(interaction, client) {
    const eventid = interaction.fields.getTextInputValue('Eventid');
    try {
      const response = await fetch(`https://api.truckersmp.com/v2/events/${eventid}`, {
        headers: {
          "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
        }
      });
      const data = await response.json();
      if (data.error === false) {
        const iuser = interaction.user.id;
        const event_name = data.response.name;
        const timemt = data.response.meetup_at;
        const timest = data.response.start_at;
        const event_dep = `${data.response.departure.city}(${data.response.departure.location})`;
        const event_des = `${data.response.arrive.city}(${data.response.arrive.location})`;
        const event_server = data.response.server.name;
        let event_brd = data.response.banner;
        if (!event_brd) event_brd = "https://static.truckersmp.com/images/bg/ets.jpg";
        const datet = (new Date(timemt)).toLocaleDateString("en-GB", { timeZone: "UTC", hour12: false }).replace(/\//ig, " ", "");
        const dates = (new Date(timemt)).toLocaleDateString("en-US", {
          timeZone: "UTC",
          hour12: false,
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const event_route = data.response.map;
        const timemtr = (new Date(timemt)).valueOf();
        const timestr = (new Date(timest)).valueOf();
        const event_timemt = `${timemtr}`.slice(0, -3);
        const event_timest = `${timestr}`.slice(0, -3);

        const infoembed = new EmbedBuilder()
          .setColor(EmbedColor)
          .setTitle(`${event_name}`)
          .setDescription(`Thanks for chosing our team for Convoy Control!`)
          .setFields(
            { name: 'Date', value: `${dates}` },
            { name: 'Meetup Time', value: `<t:${event_timemt}:t>` },
            { name: 'Start Time', value: `<t:${event_timest}:t>` },
            { name: 'Depature', value: `${event_dep}` },
            { name: 'Destnation', value: `${event_des}` },
            { name: 'TruckersMP Event Links', value: `https://www.truckersmp.com/events/${eventid}` },
          )
          .setImage(`${event_route}`);
        const brand = new EmbedBuilder()
          .setColor(EmbedColor)
          .setImage(`${event_brd}`);

        // 将权限名称转换为 PermissionsBitField.Flags 对象
        const allowedPermissions = config.allowedPermissions.map(flag => PermissionsBitField.Flags[flag]);

        // 获取允许角色 ID 列表，并添加当前用户 ID
        const allowedRoleIds = [...config.admin_role, iuser.toString()]; // 将用户 ID 转换为字符串

        // 批量生成允许权限的权限覆盖项
        const allowedOverwrites = allowedRoleIds.map(id => ({
          id,
          allow: allowedPermissions
        }));

        // 提取 parent 到配置文件，假设 config.json 中有这个字段
        const parentChannelId = config.parentChannelId;

        interaction.guild.channels.create({
          name: `${datet}`,
          reason: 'ticket',
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionFlagsBits.ViewChannel],
            },
            ...allowedOverwrites
          ],
          parent: parentChannelId,
        })
          .then(async (channel) => {
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
            const claim = new ButtonBuilder()
              .setCustomId('claim')
              .setLabel('Claim')
              .setEmoji('🙋‍♂️')
              .setStyle(ButtonStyle.Success);

            interaction.reply({
              content: `<@${iuser}> created a ticket at ${channel}`,
              ephemeral: true,
            }).catch(err => handleError(err, 'Error replying to interaction'));

            await channel.send({
              embeds: [infoembed, brand],
              components: [
                new ActionRowBuilder().addComponents(cls, clsr, claim),
              ]
            });

            const channel_id = channel.id;
            const channel_name = datet;
            const opener_id = iuser;
            const open_time = actualTime;
            const ticket_status = 0;
            await interaction.client.Tickets.create({ channel_id, channel_name, opener_id, open_time, ticket_status });
          })
          .catch(error => handleError(error, 'Error creating channel'));
      } else {
        interaction.reply({ content: 'Can\'t find the event!', ephemeral: true })
          .catch(err => handleError(err, 'Error replying to interaction'));
      }
    } catch (error) {
      handleError(error, 'Error fetching event data');
    }
  }
};