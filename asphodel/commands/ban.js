const Discord = require('discord.js');

module.exports = {
    category: 'Utilities',
    slash: true,
    testOnly: true,
    description: "Sends prettified JSON debug data.",
    minArgs: 1,
    expectedArgs: '<aspect>',
    callback: async({ args }) => {

        console.log(typeof args[0]);
        let exampleEmbed = new Discord.MessageEmbed()
            .setColor('#ff0049')
            .setDescription(`value: **\`${args[0]}\`**`);

        if (args[0] === '304241296703225858') {
            exampleEmbed = new Discord.MessageEmbed()
                .setColor('#ff0049')
                .setFooter(`You can't ban yourself...`);
        }

        return exampleEmbed;
    }
};