const Discord = require("discord.js");
const fs = require("fs");
let { prefix, slashCommands } = require("../../config.json");

module.exports = class extends Command {
  name = "help";
  description = "Shows you all of Asphodel's commands.";
  execute(client, message, args) {
    let response;

    if (!slashCommands) {
      response = new Discord.MessageEmbed()
        .setColor("#ff0049")
        .setThumbnail()
        .setTitle(`📕 **${client.user.username} Chat Commands**`)
        .setDescription(
          `Here are some of **${client.user.username}**'s chat commands.\nDon't forget to add the **\`${prefix}\`** prefix in these commands!\n\u200B`
        )
        .setTimestamp();

      for (const command of client.commands.values()) {
        response.addField(
          `**\`${prefix}${command.name}\`**`,
          command.description
        );
      }
    } else {
      if (args[0] == "slash" || args[0] == "commands") {
        if (args[0] == "slash") {
          response = new Discord.MessageEmbed()
            .setColor("#ff0049")
            .setThumbnail()
            .setTitle(`📘 **${client.user.username} Slash Commands**`)
            .setDescription(
              `**${client.user.username}**'s slash commands are instantly available when typing **\`/\`** into your chat box. Discord should tell you about the available commands!
                    \nIf it doesn't show up, make sure your server admin allows you do use Slash commands!`
            )
            .setTimestamp();
        } else {
          response = new Discord.MessageEmbed()
            .setColor("#ff0049")
            .setThumbnail()
            .setTitle(`📙 **${client.user.username} Chat Commands**`)
            .setDescription(
              `Here are some of **${client.user.username}**'s chat commands.\nDon't forget to add the **\`${prefix}\`** prefix in these commands!\n\u200B`
            )
            .setTimestamp();

          for (const command of client.commands.values()) {
            response.addField(
              `**\`${prefix}${command.name}\`**`,
              command.description
            );
          }
        }
      } else {
        response = new Discord.MessageEmbed()
          .setColor("#ff0049")
          .setThumbnail()
          .setTitle(`📚 **${client.user.username} Commands**`)
          .setDescription(
            `**${client.user.username}** supports both Slash commands and **\`${prefix}\`** commands!\nBecause of that, help comes in two parts!\n\u200B`
          )
          .addField("**`>>help commands`**", `for the Chat commands!`, true)
          .addField("**`>>help slash`**", `for the Slash commands!`, true)
          .setTimestamp();
      }
    }
    message.channel.send(response);
  }
};
