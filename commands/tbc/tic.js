const { InteractionContextType, ActionRowBuilder, PermissionFlagsBits, PermissionsBitField, ModalBuilder, TextInputBuilder, TextInputStyle, ButtonBuilder, ButtonStyle, SlashCommandBuilder, EmbedBuilder, } = require('discord.js');
const { ticketcolor } = require("../config/plugins/ticket.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName('tic')
    .setDescription('add')
		.setContexts(InteractionContextType.Guild),
  async execute(interaction) {
    await interaction.deferReply();
    await interaction.deleteReply();
    const eventtic = new EmbedBuilder()
      .setColor(ticketcolor)
      .setTitle('<:contact:1201623809980117072> ｜Contact the Senior Management Team')
      .setDescription('By clicking the button, a ticket will be opened for you with the Community Team & Leadership. You can contact them for feedback tickets, becoming our partner, employee complaints or anything else Management needs to be involved with.');
    const create = new ButtonBuilder()
      .setCustomId('ticketinit')
      .setLabel('Create a ticket')
      .setStyle(ButtonStyle.Primary);

    const cancel = new ButtonBuilder()
      .setCustomId('cancel')
      .setLabel('Cancel')
      .setStyle(ButtonStyle.Secondary);
    const row1 = new ActionRowBuilder()
      .addComponents(create, cancel);
    const msg = await interaction.channel.send({
      embeds: [eventtic],
      components: [row1],
    });
    const collector = msg.createMessageComponentCollector();
    collector.on('collect', async i => {
      if (i.customId == 'ticketinit') {
        // Create the modal
        const modal = new ModalBuilder()
          .setCustomId('myModal')
          .setTitle('Event Submission');
        // Add components to modal
        // Create the text input components
        const favoriteColorInput = new TextInputBuilder()
          .setCustomId('Eventid')
          // The label is the prompt the user sees for this input
          .setLabel("What's the ID of your VTC's event?")
          // Short means only a single line of text
          .setStyle(TextInputStyle.Short);
        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        // Add inputs to the modal
        modal.addComponents(firstActionRow);
        // Show the modal to the user
        await i.showModal(modal);
        const filter = (i) => i.customId === 'myModal';
        i.awaitModalSubmit({ time: 50_000, filter })
          .then(async (i) => {
            const eventid = i.fields.getTextInputValue('Eventid');
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
              const infoembed = new EmbedBuilder()
                .setColor(ticketcolor)
                .setTitle(`${event_name}`)
                .setDescription(`	${eventid}`);
              i.guild.channels.create({
                name: `${event_name}`,
                reason: 'ticket',
                permissionOverwrites: [
                  {
                    id: i.guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel],
                  },
                  {
                    id: '976373988244721664',
                    allow: [PermissionFlagsBits.ViewChannel],
                  },
                  {
                    id: i.user.id,
                    allow:
                      [
                        PermissionsBitField.Flags.ViewChannel,
                        PermissionsBitField.Flags.SendMessages,
                        PermissionsBitField.Flags.AddReactions,
                        PermissionsBitField.Flags.AttachFiles,
                      ]
                  }],
                parent: '1111581547087278080',
              })
                
						.then(async(channel) => {
							const cls = new ButtonBuilder()
								.setCustomId('close')
								.setLabel('Close')
								.setStyle(ButtonStyle.Danger);
							const clsr = new ButtonBuilder()
								.setCustomId('closereason')
								.setLabel('Close with reason')
								.setStyle(ButtonStyle.Danger);
								
							i.reply({
								content: `${i.user.username} created a ticket at ${channel}`,
								ephemeral: true,
							});
							await channel.send({ 
								embeds: [infoembed],
								components:[
									new ActionRowBuilder().addComponents(cls,clsr),
								]
							});
						})
                .catch(error => {
                  console.log(error)
                  return;
                })
            } else {
              i.reply({ content: 'Can\'t find the event!', ephemeral: true })
                .catch(err => {
                  console.log(err);
                  return;
                })
            }
          })
          .catch(err => {
            console.log('No modal submit interaction was collected');
            return;
          });
      } else if (i.customId == 'cancel') {
        i.reply({ content: 'canceled', ephemeral: true })
          .catch(err => {
            console(err);
            return;
          })
      }
    });
  },
};