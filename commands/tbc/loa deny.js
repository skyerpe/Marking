const { ContextMenuCommandBuilder,ApplicationCommandType } = require('discord.js');
module.exports = {
	data: new ContextMenuCommandBuilder()
	.setName('LOA Deny')
        .setType(ApplicationCommandType.Message),
async execute(interaction) {
        const message = interaction.targetMessage;
        await interaction.deferReply();
        await interaction.deleteReply();
        await message.react('1206372628391002192');
	},
};