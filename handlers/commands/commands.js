const fs = require('fs');
const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  execute(client) {
    //slashCommands Read
    const slashcommandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    for (const file of slashcommandFiles) {
      const command = require(`../../commands/${file}`);
      client.commands.set(command.data.name, command);
    };
  }
}