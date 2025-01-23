const webshot = require('node-webshot'); 
const wait = require('node:timers/promises').setTimeout;
const {  SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Select a member and promote them.')
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.setDMPermission(false),
	async execute(interaction) {
        var bool =0;
        const {option}= require('../../config/plugins/option.json');
        webshot('https://traffic.krashnz.com/', `s${n}.png`, option, function(err) {
          });
          interaction.deferReply();
          await wait(7000);
          await interaction.channel.send({
            files: [{
              attachment: `s${n}.png`,
              name: `s${n}.png`
            }]
          })
          .catch(error => {
            //LOG
            if (error.code == -4058) {
              bool = 1;
            }
          });
          if (bool == 1) {
            return console.log(colors.yellow('图片未找到'));
          } 
          else if (bool == 0) {
            return console.log(colors.green('图片已发送'));
          } 
          else {
            return;
          }
	},
};