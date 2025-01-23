const {fontStyle}=require('font-style');
module.exports={
  data: {
    name:'eveinfo'
  },
  async execute(interaction,client){
  const eventid = await interaction.fields.getTextInputValue('Eventid');
  const response = await fetch(`https://api.truckersmp.com/v2/events/${eventid}`, {
    headers: {
      "User-Agent": "Apifox/1.0.0 (https://apifox.com)"
    }
  });
  const data = await response.json();
  if (data.error == false) {
    const event_id = data.response.id;
    const ename = data.response.name;
    const event_name = fontStyle(ename,'bold')
    const timemt = data.response.meetup_at;
    const timest = data.response.start_at;
    const event_dep = `${data.response.departure.city}(${data.response.departure.location})`;
    const event_des = `${data.response.arrive.city}(${data.response.arrive.location})`;
    const event_server = data.response.server.name;
    const event_brd = data.response.banner;
    const datet = (new Date(timemt)).toLocaleDateString("en-GB", { timeZone: "Asia/Shanghai", hour12: false }).replace(/\//ig, " ", "");
    const dates = (new Date(timemt)).toLocaleDateString("en-US", {
      timeZone: "Asia/Shanghai",
      hour12: false,
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    const timemtr = (new Date(timemt)).valueOf();
    const timestr = (new Date(timest)).valueOf();
    const event_timemt = `${timemtr}`.slice(0, -3);
    const event_timest = `${timestr}`.slice(0, -3);
    interaction.guild.channels
      .create({
        name: `${datet}｜${event_name}`,
        reason: 'ticket',
        parent: '1186954557369102378',
      })
      .then(channel => {
        interaction.reply({
          content: `${channel} created!`,
          ephemeral: true,
        })
          .catch(err => {
            console.log(err);
            return;
          });
        channel.send(`# <:i_:1202751392079548476> | Name:
- ${event_name}

# <:Event:1194974971403968513>  | Date:
- ${dates}

# <:announcement:1202746687274225684> | Information:
- <:Start:1194979139669737573> Location : ${event_dep}
- <:END:1194978958568083546> Destination : ${event_des}
- <:DLC:1206360294054699008>  DLCs : None

# <:time:1199757627517829172> | Time:
- <:MeetTime:1194977938303623198> Meetup : <t:${event_timemt}:t>
- <:DepartTime:1194978223281426492> Departure : <t:${event_timest}:t>
- <:Website:1194980763460980756> Server : ${event_server}

# 🔗 | Links:
- <:TMP2:1114746524585435246> Event https://truckersmp.com/events/${event_id}`
        );
        if (event_brd == null) {
          console.log('no banner');
        } else {
          channel.send(`${event_brd}?w=3333&h=1333`
          );
        }
      })
      .catch(error => console.log(error));
    return;
  } else {
    interaction.reply({ content: 'Can\'t find the event!', ephemeral: true });
  }
}
}