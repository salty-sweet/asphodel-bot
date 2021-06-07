const Discord = require("discord.js");

module.exports = class extends Command {
  name = "reload";
  description = "Reloads Asphodel.";
  execute(_client, message, args) {
    const response = new Discord.MessageEmbed()
      .setColor("#ff0049")
      .setTitle(`💢 Command is currently empty!`)
      .setDescription(
        "`reload` command does not have any function yet as of the moment."
      )
      .setTimestamp();
    message.channel.send(response);
  }
};
