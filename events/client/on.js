const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.Staffs.sync();
		client.Tickets.sync();
		console.log(`机器人${client.user.username}正在运行！`);
		client.users.send('611521472229408768','Marking Event Working*!*')
	},
};