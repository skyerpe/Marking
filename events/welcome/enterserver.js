const colors = require('colors/safe');
const wait = require('node:timers/promises').setTimeout;
const { actualTime } = require('../../date/date.js');
const { AttachmentBuilder ,Events,  SnowflakeUtil } = require('discord.js');
const { status, Channel, Role } = require('../../config/plugins/welcome.json');
const Canvas = require('@napi-rs/canvas');
module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    if (status.welcome == true) {
      const nonce = (SnowflakeUtil.generate()).toString();
      const userID = member.user.id;
      const userNICK = member.user.username;
      const mc = member.guild.memberCount;
      const bot = await member.guild.fetchIntegrations({ includeApplications: true });
      const real = mc - bot.size;
      const canvas = Canvas.createCanvas(2160, 1080);
      const context = canvas.getContext('2d');
      const bodyBgs = [];
      bodyBgs[0] = "./Image/1.png";
      bodyBgs[1] = "./Image/2.png";
      const randomBgIndex = Math.round(Math.random()*1);
      const imgsr = bodyBgs[randomBgIndex];
      const background = await Canvas.loadImage(`${imgsr}`)
        .catch(error => {
          console.log(error);
        }
      );
      context.drawImage(background, 0, 0, canvas.width, canvas.height);
      const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ size: 4096,extension: 'jpg' }));
      context.beginPath();
      context.arc(540, 540, 440, 0, Math.PI * 2, true);
      context.closePath();
      context.clip();
      context.drawImage(avatar, 100, 100, 880, 880);
      const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'profile-image.png' });
      const bool = 0;
      member.roles.add([Role.other, Role.Member, Role.MarkingBirth]);
      await client.Sers.findOrCreate({
        where: { user_id: userID },
        defaults: {
          user_nick: userNICK,
        },
      });
      await client.channels.cache.get(Channel.log.wel).send({
        files: [attachment],
        enforceNonce: true,
        nonce: nonce,
      })
        .catch(error => {
          console.log(error);
          //LOG
          if (error.code == 50007) {
            bool = 1;
          }
        });
      if (bool == 1) {
        return console.log(colors.yellow(`消息发送失败！${actualTime}`));
      }
      else if (bool == 0) {
        if (!member.user.bot) {
          console.log(colors.green(`新成员加入! ${actualTime}`));
          await wait(2_000);
          client.channels.fetch('1234848246388621312')
            .then(channel => channel.setName(`All Members: ${mc}`));
          client.channels.fetch('1234848281230704682')
            .then(channel => channel.setName(`Members: ${real}`));
          return;
        } else {
          console.log(colors.green(`机器人加入! ${actualTime}`));
          await wait(2_000);
          client.channels.fetch('1234848246388621312')
            .then(channel => channel.setName(`All Members: ${mc}`));
          client.channels.fetch('1234848354286960771')
            .then(channel => channel.setName(`Bots: ${mc - real}`));
          return;
        }
      }
      else {
        return;
      }
    }
    else {
      return;
    }
  },
};