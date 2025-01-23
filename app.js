const fs = require('node:fs');
const Sequelize = require('sequelize');
const { token } = require("./config/main/config.json");
const { Client, Collection, GatewayIntentBits,Partials} = require("discord.js");

const client = new Client({ 
	intents: [
		GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions
	],
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ],
  presence: {
    status: 'idle',
    clientStatus :'mobile',
    activities:[
      {
        name:'ME',
        emoji:[{id:1188323874916548709}],
        state:'Marking Event Welcome you!',
        type:4
      },
    ],
  },
  shards: 'auto'
});
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});
const Staffs = require("./database/Stfms.js")(sequelize, Sequelize.DataTypes);
const Events = require("./database/Events.js")(sequelize, Sequelize.DataTypes);
const Sers = require("./database/Users.js")(sequelize, Sequelize.DataTypes);
const LOAs = require("./database/LOAs.js")(sequelize, Sequelize.DataTypes);
const Tickets = require("./database/Tickets.js")(sequelize, Sequelize.DataTypes);
client.TMPEvents = Events;
client.Staffs = Staffs;
client.Sers = Sers;
client.LOAs = LOAs;
client.Tickets = Tickets;
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
module.exports = client;

//Events Read
fs.readdirSync('./events').filter((dir) => {
  let files = fs.readdirSync(`./events/${dir}`).filter((file) => file.endsWith(".js"));
  for (let file of files) {
    const event = require(`./events/${dir}/${file}`);
    client.on(event.name, (...args) => event.execute(...args, client));
  }
});

//Handler File Read
fs.readdirSync('./handlers').filter((dir) => {
  let files = fs.readdirSync(`./handlers/${dir}`).filter((file) => file.endsWith(".js"));
  for (let file of files) {
    const handler = require(`./handlers/${dir}/${file}`);
    client.on(handler.name, (...args) => handler.execute(...args, client));
  }
});

client.login(token);