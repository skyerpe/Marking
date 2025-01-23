const { SlashCommandBuilder, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eventinfo')
		.setDescription('Creat the information at Event Information channel')
		.setDMPermission(false),
	async execute(interaction) {
		// Create the modal
		const modal = new ModalBuilder()
			.setCustomId('eventModal')
			.setTitle('My Modal');
		// Add components to modal
		// Create the text input components
		const eventInput = new TextInputBuilder()
			.setCustomId('Eventid')
			// The label is the prompt the user sees for this input
			.setLabel("What's the ID event?")
			// Short means only a single line of text
			.setStyle(TextInputStyle.Short);
		// An action row only holds one text input,
		// so you need one action row per text input.
		const nameInput = new TextInputBuilder()
			.setCustomId('date')
			// The label is the prompt the user sees for this input
			.setLabel("What's date of the event?")
			// Short means only a single line of text
			.setStyle(TextInputStyle.Short);
		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(eventInput);
		const secondActionRow = new ActionRowBuilder().addComponents(nameInput);
		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		// Show the modal to the user
		await interaction.showModal(modal);
		const filter = (interaction) => interaction.customId === 'eventModal';
		interaction.awaitModalSubmit({ time: 50_000, filter })
			.then(async (interaction) => {
				const eventid = await interaction.fields.getTextInputValue('Eventid');
				const date = await interaction.fields.getTextInputValue('date');
				const response = await fetch(`https://api.truckersmp.com/v2/events/${eventid}`, {
					headers: {
						"User-Agent": "Apifox/1.0.0 (https://apifox.com)"
					}
				});
				const data = await response.json();
				if (data.error == false) {
					const event_id = data.response.id;
					const event_name = data.response.name;
					const event_timemt = data.response.meetup_at;
					const event_timest = data.response.start_at;
					const event_dep = `${data.response.departure.city}(${data.response.departure.location})`;
					const event_des = `${data.response.arrive.city}(${data.response.arrive.location})`;
					const event_server = data.response.server.name;
					const event_brd = data.response.banner;
					interaction.guild.channels
						.create({
							name: `${date}｜${event_name}`,
							reason: 'ticket',
							parent: '1186954557369102378',
						})
						.then(channel => {
							interaction.reply({
							content: `${channel} created!`,
							ephemeral: true,
						})
						.catch(err=>{
							console.log(err);
							return;
						});
							channel.send(`# <:i_:1202751392079548476> | Name:
- ${event_name}

# <:Event:1194974971403968513>  | Date:
- ${date}

# <:announcement:1202746687274225684> | Information:
- <:Start:1194979139669737573> Location : ${event_dep}
- <:END:1194978958568083546> Destination : ${event_des}
- <:DLC:1206360294054699008>  DLCs : None

# <:time:1199757627517829172> | Time:
- <:MeetTime:1194977938303623198> Meetup : ${event_timemt}
- <:DepartTime:1194978223281426492> Departure : ${event_timest}
- <:Website:1194980763460980756> Server : ${event_server}

# 🔗 | Links:
- <:TMP2:1114746524585435246> Event https://truckersmp.com/events/${event_id}
${event_brd}`);
						})
						.catch(error => console.log(error));
					return;
				} else {
					interaction.reply({ content: 'Can\'t find the event!', ephemeral: true });
				}
			})
			.catch(err => console.log('No modal submit interaction was collected'));
	},
};