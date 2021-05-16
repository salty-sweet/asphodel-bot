const Discord = require('discord.js');

module.exports = {
    category: 'Utilities',
    slash: true,
    testOnly: true,
    description: "Grab someone's profile picture at the highest resolution.",
    minArgs: 1,
    expectedArgs: '<user> [size]',
    callback: ({ message, args }) => {

        const [user, size] = args;

        user = user || message.author;

        console.log(user.avatarURL());

        const response = new Discord.MessageEmbed()
            .setAuthor(user);

        if (user.displayAvatarURL({ dynamic: true }).endsWith('.gif')) {
            response.setImage(user.avatarURL({ size: size, dynamic: true }))
                .setDescription(`\`\`\`Image Size: ${size}\nAnimated: true\`\`\``);
        } else {
            response.setImage(user.avatarURL({ size: size }))
                .setDescription(`\`\`\`Image Size: ${size}\nAnimated: false\`\`\``);
        }

        response.setTimestamp();

        return response;
    },
};