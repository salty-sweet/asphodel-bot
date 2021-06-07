const Discord = require("discord.js");

module.exports = class extends Command {
  name = "avatar";
  description = "Grab someone's profile picture at the highest resolution.";
  execute(client, message, args) {
    if (args[0] == null) {
      message.reply(
        `**Incomplete parameters!** This command works in this format:\n\n${prefix}avatar \`[Discord User ID]\` \`[Image Size]\`*(optional)*`
      );
      return;
    }
    const mention = message.mentions.users.first();
    const user = mention ? mention.id : args[0];
    const size = args[1] ? parseInt(args[1]) : 4096;

    client.users.fetch(user).then((myUser) => {
      console.log(myUser.avatarURL());

      const response = new Discord.MessageEmbed().setAuthor(myUser);

      if (myUser.displayAvatarURL({ dynamic: true }).endsWith(".gif")) {
        response
          .setImage(myUser.avatarURL({ size: size, dynamic: true }))
          .setDescription(`\`\`\`Image Size: ${size}\nAnimated: true\`\`\``);
      } else {
        response
          .setImage(myUser.avatarURL({ size: size }))
          .setDescription(`\`\`\`Image Size: ${size}\nAnimated: false\`\`\``);
      }

      response.setTimestamp();

      message.channel.send(response);
    });
  }
};
