const Discord = require("discord.js");

module.exports = class extends Command {
  name = "ping";
  description = "Table tennis but with numbers.";
  async execute(client, message, _args) {
    const exampleEmbed = await new Discord.MessageEmbed()
      .setColor("#ff0049")
      .setThumbnail()
      .setTitle(`🏓 Pong!`)
      .setDescription(
        `WebSocket ping is ${client.ws.ping}MS\nMessage sent ping is ${
          Date.now() - message.createdAt
        }MS!`
      )
      .setTimestamp();
    const msg = await message.channel.send(exampleEmbed);
  }
};
