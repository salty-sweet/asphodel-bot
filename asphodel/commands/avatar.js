const Discord = require('discord.js');

module.exports = {
    category: 'Utilities',
    slash: true,
    testOnly: true,
    description: "Grab someone's profile picture at the highest resolution.",
    minArgs: 1,
    expectedArgs: '<user>',
    callback: async({ message, client, interaction }) => {

        let mention = interaction.data.options[0].value;

        if (!mention) return "response";

        if (mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if (mention.startsWith('!')) {
                mention = mention.slice(1);
            }
        }

        const user = await client.users.fetch(mention);
        const size = 4096;

        const response = new Discord.MessageEmbed()
            .setAuthor(await client.users.fetch(interaction.member.user.id));

        if (user.displayAvatarURL({ dynamic: true }).endsWith('.gif')) {
            response.setImage(user.avatarURL({ size: size, dynamic: true }))
                .setDescription(`\`\`\`Image Size: ${response.image.size}\nAnimated: true\`\`\``);
        } else {
            response.setImage(user.avatarURL({ size: size }))
                .setDescription(`\`\`\`Image Size: ${response.image.size}\nAnimated: false\`\`\``);
        }

        response.setTimestamp();

        return response;

    },
};