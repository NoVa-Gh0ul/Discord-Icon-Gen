const { Client, GatewayIntentBits } = require("discord.js");
require("dotenv").config();
const token = process.env.TOKEN;

// im lazy, i threw all intents in cuz why not
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return; // Ignore if it's not a command

    const { commandName } = interaction;

    try {
        const command = require(`./commands/${commandName}.js`);

        if (command) {
            await command.execute(interaction);
        } else {
            await interaction.reply(`Command "${commandName}" not found.`);
        }
    } catch (error) {
        console.error('Error executing command:', error);
        await interaction.reply('An error occurred while executing the command.');
    }
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection Recieved:', error);
});

// Load events dynamically
const { readdirSync } = require('fs');
const { join } = require('path');

const eventFiles = readdirSync(join(__dirname, 'events')).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(join(__dirname, 'events', file));
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}


client.login(token);
console.log(
  "\x1b[32m\x1b[1m\x1b[2m",
  "                 Discord-Icon-Gen v1.0.0 Starting. . .\n",
  "\x1b[0m"
);