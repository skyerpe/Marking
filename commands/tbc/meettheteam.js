const {  Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	execute(client) {
        client.channels.fetch('1099241913065951282')
        .then(channel=> 
            channel.messages.fetch('1232426979291168789')
            .then(message => message.edit('123')));
	},
};