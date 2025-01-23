const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, EmbedBuilder, InteractionContextType } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Select status of event.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('status')
				.setDescription('The status of the event.')
				.addStringOption(option =>
					option
						.setName('sta')
						.setDescription('Status of event.')
						.setRequired(true)
						.addChoices(
							{ name: 'Accept', value: 'acc' },
							{ name: 'Deny', value: 'deny' },
							{ name: 'Pending', value: 'ped' },
						)
				)
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('The user to reply')
						.setRequired(true)
				)
				.addStringOption(option =>
					option
						.setName('reason')
						.setDescription('Reason of event.')
						.setRequired(false)
						.addChoices(
							{ name: 'Convoy', value: 'deny1' },
							{ name: 'Time', value: 'deny2' },
						))
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('rule')
				.setDescription('Rules about the Event')
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('done')
				.setDescription('Done the Event')
		).addSubcommand(subcommand =>
			subcommand
				.setName('info')
				.setDescription('Information about the Event')
		)
		.setContexts(InteractionContextType.Guild),
	async execute(interaction) {
		const pem = interaction.member.roles.cache.hasAny('936193745823621120','1050379804224016398','1314547409690300426');
		if (pem == true) {
			if (interaction.options.getSubcommand() === 'status') {
				const member = interaction.member.nickname;
				const cm = interaction.channel.topic;
				const sta = interaction.options.getString('sta');
				const userid = interaction.options.getUser('target');
				const reason = interaction.options.getString('reason');
				const error = new EmbedBuilder()
					.setColor('Red')
					.setTitle(`Error`)
					.setDescription(`Commmand error`);
				async function Accept() {
					interaction.channel.edit({ name: `🟢-${cm}` });
					await interaction.channel.send(`Status of this ticket has been changed to \`🟢\` - **\`ACCEPT\`**.
	
We will offer Supervisions, when we are free to do that.
:pushpin: Our Staff are notified about this event at the right time!
							
> Please modify your event rules to the rules we need, and add our banner on the TMP event page
							
Thanks for your choose us  understanding! <:huge:996451115837169704>
							
**Kind Regards,**
**${member}**
**Marking | Event Management**`);
					await interaction.deferReply();
					await interaction.deleteReply();
				}
				async function Deny() {
					interaction.channel.edit({ name: `🔴-${cm}` });
					await interaction.channel.send(`Status of this ticket has been changed to \`🔴\` - **\`REFUSE\`**.
	
Thank you very much for choose us Marking Event!
Unfortunately we have a scheduled other convoy on the same day, and we are unable to participate.
				
We still wish you a successful outcome with your convoy and event!
				
Please do not message us about these things, Thanks for your choose us & understanding!
${userid}						
							
**Kind Regards,**
**${member}**
**Marking | Event Management**`);
					await interaction.deferReply();
					await interaction.deleteReply();
				}
				async function Pending() {
					interaction.channel.edit({ name: `🟡-${cm}` });
					await interaction.channel.send(`Hello ${userid}

Our Event Manager will get back to you shortly,
Please be patient and thank you for your cooperation.

Status of this ticket has been changed to \`🟡\` - **\`IN PROGRESS\`**.
Your Event Supervisions ask ticket is currently in progress on this ticket channel.
So Please do not Close the Ticket or Leave the Discord server.

Thanks for your invite! <:huge:996451115837169704> 

**Kind Regards,**
**${member}**
**Marking | Event Management**`);
					await interaction.deferReply();
					await interaction.deleteReply();
				}
				if (sta == 'acc') {
					Accept();
				}
				else if (sta == 'deny') {
					Deny();
				}
				else if (sta == 'ped') {
					Pending();
				}
				else {
					interaction.deferReply();
					await interaction.editReply(
						{
							embed: [error],
						});
					return;
				}
			}
			else if (interaction.options.getSubcommand() === 'rule') {
				interaction.channel.send(`# Event Rules:
\`\`\`📚 Event Rules for Participants:
### Event Rules for Participants:
- The Event Staff are recognized as; “Marking Event | EM / Marking | CC / Marking | Media / Marking | GMs / Event Staff or Similar“ or similar.
- Impersonating Event Staff using the aforementioned  is forbidden.
- Double trailers, Triple trailers, HCT trailers and Heavy Haul configurations are prohibited. (Except Event Staff)
- Cars and Bus are prohibited except for event staff showing a clear tag
- Participants must haul a trailer. (Except Event Staff)
- Advertising is prohibited. (Except Event Staff)
- Overtaking is prohibited. (Except Event Staff)
- Participants with consistent lag must remain at the back of the convoy.
- Instructions given by Event Staff must be followed.
- Participants should park at their designated slots. If you don't have a designated slot you are required to park in the 'Public Parking' area.
- Convoy participants must only leave the starting location when instructed to do so in an orderly (one by one) manner.
- Participants are allowed to block the parking lane and the left lane at the start and break for a smooth starting and resume. The lane between them must be kept clear for participants who wish to drive to their VTC, petrol station or to leave the convoy. According to this image: https://imgur.com/oRAwvAy.png
- All other TruckersMP rules apply.
### 👮‍Event Rules for Event Staff:
- Event Staff overtaking the convoy cannot be performed by more than 2 members at a time.
- Event Staff can drive the incorrect way where roads have a central reservation barrier ONLY. In accordance with the rule above.
- Event Staff can block junctions and roads approaching junctions in order to direct the convoy.
- Event Staff can park out of bounds. Providing this is on the ground and not on top of buildings or other inappropriate places deemed unsuitable by TruckersMP Staff.
- All other TruckersMP rules apply.\`\`\``);
				await interaction.channel.send(`# Event Page
\`\`\`### Event Supervised by [Marking Event](https://discord.gg/marking)
![](https://s3.bmp.ovh/imgs/2024/01/11/5eb93d388499c765.png)\`\`\``);
				await interaction.deferReply();
				await interaction.deleteReply();
			}
			else if (interaction.options.getSubcommand() === 'done') {
				interaction.channel.send('# \`🟢\` - \`DONE !\`');
				await interaction.channel.setParent('1223673507729375272')
				await interaction.deferReply();
				await interaction.deleteReply();
			}
			else if (interaction.options.getSubcommand() === 'info') {
				// Create the modal
				const modal = new ModalBuilder()
					.setCustomId('eveinfo')
					.setTitle('Event Information');
				// Add components to modal
				// Create the text input components
				const eventInput = new TextInputBuilder()
					.setCustomId('Eventid')
					// The label is the prompt the user sees for this input
					.setLabel("What's the ID event?")
					.setMaxLength(5)
					// Short means only a single line of text
					.setPlaceholder('The id after \`https://truckersmp.com/events/\'')
					.setStyle(TextInputStyle.Short)
					.setRequired(true);
				// An action row only holds one text input,
				// so you need one action row per text input.
				// An action row only holds one text input,
				// so you need one action row per text input.
				const firstActionRow = new ActionRowBuilder().addComponents(eventInput);
				// Add inputs to the modal
				modal.addComponents(firstActionRow);
				// Show the modal to the user
				await interaction.showModal(modal);
			} else {
				interaction.reply({ content: 'You don;t have permission!', ephemeral: true })
			}
		} else {
			interaction.reply({content:'You don\'t have permission!', ephemeral: true })
		}
	},
};