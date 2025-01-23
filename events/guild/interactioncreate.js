const { Events } = require('discord.js');
const client = require('../../app');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`未发现有关 ${interaction.commandName} 的命令`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`执行 ${interaction.commandName} 失败`);
				console.error(error);
			}
		} else if (interaction.isButton()) {
			const { buttons } = client;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if(!button) return new Error('There is no code for this button.');
			try{
				await button.execute(interaction,client);
			}catch (error){
				console.error(`执行 ${interaction.commandName} 失败`);
				console.error(error);
			}
			// respond to the button
		} else if (interaction.isContextMenuCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`未发现有关 ${interaction.commandName} 的命令`);
				return;
			}
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(`执行 ${interaction.commandName} 失败`);
				console.error(error);
			}
		} else if (interaction.isModalSubmit()) {
			const { modals } = client;
			const { customId } = interaction;
			const modal = modals.get(customId);
			if(!modal) return new Error('There is no code for this button.');
			try{
				await modal.execute(interaction,client);
			}catch (error){
				console.error(`执行 ${interaction.commandName} 失败`);
				console.error(error);
			}
			// respond to the modal
		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
			try {
				command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		} else return;
	},
};