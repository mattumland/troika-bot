const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Sequelize, Model } = require('sequelize');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const sequelize = new Sequelize('database', 'root', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false, //set logging to false before deploying, this is for production only
	storage: 'database.sqlite',
});

class Game extends Model {

}

Game.init( {
		id: {
			type: Sequelize.STRING,
			primaryKey: true,
			unique: true,
		},
		pcs: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		defaultStack: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		currentStack: {
			type: Sequelize.STRING,
			defaultValue: ""
		},
		currentTurn: {
			type: Sequelize.STRING,
			defaultValue: ""
		} 
	}, {
		sequelize,
		timestamps: false,
		modelName: "Game"
}); 

client.login(token);
client.commands = new Collection();

client.once(Events.ClientReady, () => {
	Game.sync({ force: true }); //remove force before deploying, this is for production only
	console.log(`Logged in as ${client.user.tag}!`);
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
