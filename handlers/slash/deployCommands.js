var colors = require('colors/safe');
const fs = require('fs');
const { clientId, token } = require('../../config/main/config.json');
const { actualTime } = require('../../date/date.js');
const { REST, Routes, Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  execute(client) {
    const slashcommands = [];
    const slashcommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of slashcommandFiles) {
      const command = require(`../../commands/${file}`);
      slashcommands.push(command.data.toJSON());
    }
    const rest = new REST({
      version: '10'
    }).setToken(token);
    rest.put(Routes.applicationCommands(clientId), {
      body: slashcommands
    }).then(() => console.log(colors.green(`命令注册成功! ${actualTime}`)))
      .catch(err => {
        console.log(colors.red(err));
      });
    slashcommands.forEach(eachcommands => {
      console.log(colors.blue(`${eachcommands.name} 已加载`));
    });
  },
};