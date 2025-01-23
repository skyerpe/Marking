const colors = require('colors/safe');
const wait = require('node:timers/promises').setTimeout;
const { Events, EmbedBuilder } = require('discord.js');
const { status , Channel } = require('../../config/plugins/welcome.json');
const { ticketcolor } = require("../../config/plugins/ticket.json");
module.exports = {
	name: Events.GuildMemberRemove,
	async execute(member,client) {
  if(status.leave == true ) {
	const userID = member.user.id;
  const date = new Date();
  const actualTime = date.toLocaleString("zh-CN", {timeZone: "Asia/Shanghai", hour12: false});
  const avatarURL = member.user.displayAvatarURL({size:4096});
  const mc = member.guild.memberCount;
  const bot = await member.guild.fetchIntegrations({ includeApplications: true });
  const real = mc - bot.size;
	const embed = new EmbedBuilder()
		.setColor(ticketcolor)    
		.setThumbnail(avatarURL)
		.setTitle(`See ya!`)
		.setDescription(`Community Member <@${userID}> Left us 😭
    We will miss you 💞.
    Hope you will come back soon!`)
    //message
    const bool = 0;
    client.Sers.destroy({ where: { user_id: userID } });
    await client.channels.cache.get(Channel.log.left).send({
      embeds: [embed]
      })
    .catch(error => {
      //LOG
      if (error.code == 50007) {
        bool = 1;
      }
    });
		if (bool == 1) {
      return console.log(colors.yellow(`消息发送失败！${actualTime}`));
    } else if (bool == 0) {
      if(!member.user.bot){
      console.log(colors.green(`成员离开! ${actualTime}`));
      await wait(2_000);
      client.channels.fetch('1234848246388621312')
      .then(channel=>channel.setName(`All Members: ${mc}`));
      client.channels.fetch('1234848281230704682')
      .then(channel=>channel.setName(`Members: ${real}`));
      return;
      } else {
      console.log(colors.green(`机器人离开! ${actualTime}`));
      await wait(2_000);
      client.channels.fetch('1234848246388621312')
      .then(channel=>channel.setName(`All Members: ${mc}`));
      client.channels.fetch('1234848354286960771')
      .then(channel=>channel.setName(`Bots: ${mc- real}`));
		  return;
        }
    } else {
      return;
    }
  }
  else {
    return;
  }
	},
};