const { Events, REST, Routes } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const token = process.env.TOKEN;

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {

    const commands = [];
    const commandFiles = readdirSync(join(__dirname, '..', 'commands')).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(join(__dirname, '..', 'commands', file));
      // Check if command.data exists before calling toJSON
      if (command.data) {
        commands.push(command.data.toJSON());
      } else {
        console.log(`[WARNING] | Skipping ${file} because command.data is undefined.`);
      }
    }

    const rest = new REST({ version: '9' }).setToken(token);

    try {
      console.log(`[CLIENT]  >>>  Started refreshing ${commands.length} application (/) commands. . .`);

      const guildId = process.env.GUILD_ID;

      await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );

      console.log(`Successfully reloaded ${commands.length} application (/) commands!`)
    } catch (error) {
      console.log("[ERROR]  >>>  An error occurred during command refreshing:", error)
    }
  }
};
