const Discord = require("discord.js");

module.exports = class extends Command {
  name = "prune";
  description = "Removes a number of messages in a channel.";
  execute(_client, message, args) {
    const amount = !!parseInt(args[0]) ? parseInt(args[0]) : parseInt(args[1]);
    const user = message.mentions.users.first();

    function SendResponse(reply) {
      const response = new Discord.MessageEmbed()
        .setColor("#ff0049")
        .setTitle(reply);
      message.channel.send(response).then((msg) => {
        msg.delete({ timeout: 5000 });
      });
    }

    // pls fix later for fancier reponse returns
    if (!amount) {
      if (!user)
        return SendResponse(
          "💢 The amount of messages to be deleted and must be specified.\nThe message's author is optional."
        );
      return SendResponse("💢 Must specify an amount of messages to delete!");
    }
    if (amount > 100)
      return SendResponse("💢 Amount of messages to delete cannot exceed 100.");

    message.delete().then(() => {
      message.channel.messages
        .fetch({ limit: 100 })
        .then((fetched) => {
          let filtered = fetched.filter((msg) => !msg.pinned);

          if (user) {
            const filterBy = user ? user.id : Client.user.id;
            filtered = filtered
              .filter((msg) => msg.author.id === filterBy)
              .array()
              .slice(0, amount);
          }
          filtered = filtered.array().slice(0, amount);

          message.channel
            .bulkDelete(filtered, true)
            .then((deleted) => {
              console.log(`Bulk deleted ${deleted.size} messages`);
              if (!isNaN(deleted.size) || deleted.size > 0) {
                SendResponse(
                  `Deleted ${deleted.size} message${
                    deleted.size !== 1 ? "s" : ""
                  }.`
                );
              } else {
                SendResponse("There's nothing for me to delete.");
              }
            })
            .catch(console.error);
        })
        .catch(console.error);
    });
  }
};
