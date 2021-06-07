const { Message, MessageEmbed } = require("discord.js");
const Command = require("./command");

module.exports = class extends Command {
  name = "whois";
  category = "General";

  execute(msg, args) {
    let User =
      msg.guild.member(msg.mentions.users.first()) ||
      msg.guild.members.cache.get(args[0]);
    if (!User) User = msg.author;
    let joinPos = msg.guild.members
      .array()
      .sort((a, b) => a.joinedAt - b.joinedAt);

    let embed = new MessageEmbed()
      .setAuthor(User.tag, User.displayAvatarURL())
      .setDescription(User)
      .addField(`Joined: ${msg.guild.member(user).joinedAt}`)
      .setThumbnail(User.displayAvatarURL())
      .addField(
        "Join Position",
        joinPos.findIndex((obj) => obj.user.id === user.id) === 0
          ? 1
          : joinPos.findIndex((obj) => obj.user.id === user.id),
        true
      )
      .addField(`Registered`, moment(user.createdAt).format("llll"), true)
      .addField(
        `Roles [${msg.guild.member(user).roles.size}]`,
        msg.guild
          .member(user)
          .roles.map((r) => r.toLocaleString())
          .join(" ")
      )
      .setTimestamp()
      .setFooter(user.id)
      .setColor("RANDOM");

    msg.channel.send(embed);
  }
};
