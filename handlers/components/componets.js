const fs = require('fs');
const { Events } = require('discord.js');

module.exports = {
  name: Events.ClientReady,
  execute(client) {
    //buttonComponents Read
    const buttoncomponents = fs.readdirSync('./components/buttons').filter(file => file.endsWith('.js'));
    for (const file of buttoncomponents) {
      const button = require(`../../components/buttons/${file}`);
      client.buttons.set(button.data.name, button);
    };
    //modelComponents Read
    const modalcomponents = fs.readdirSync('./components/modals').filter(file => file.endsWith('.js'));
    for (const file of modalcomponents) {
      const modal = require(`../../components/modals/${file}`);
      client.modals.set(modal.data.name, modal);
    };
  }
}