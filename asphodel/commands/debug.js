const Discord = require('discord.js');

module.exports = {
    category: 'Utilities',
    slash: true,
    testOnly: true,
    description: "Sends prettified JSON debug data.",
    minArgs: 1,
    expectedArgs: '<aspect>',
    callback: async({ message, channel, args, text, client, instance, interaction }) => {

        switch (interaction.data.options[0].value) {
            case 'message':
                console.log(message);
                return `\`\`\`json\n${JSON.stringify(message, undefined, 4)}\`\`\``;
            case 'channel':
                console.log(channel);
                return `\`\`\`json\n${JSON.stringify(channel, undefined, 4)}\`\`\``;
            case 'args':
                console.log(args);
                return `\`\`\`json\n${JSON.stringify(args, undefined, 4)}\`\`\``;
            case 'text':
                console.log(text);
                return `\`\`\`json\n${JSON.stringify(text, undefined, 4)}\`\`\``;
            case 'client':
                console.log(client);
                return `\`\`\`json\n${JSON.stringify(client, undefined, 4)}\`\`\``;
            case 'interaction':
                console.log(interaction);
                return `\`\`\`json\n${JSON.stringify(interaction, undefined, 4)}\`\`\``;
            case 'instance':
                console.log(instance);
                return `\`\`\`json\n${JSON.stringify(instance, undefined, 4)}\`\`\``;

            default:
                return "\`\`\`json\nnone specified.\`\`\`";
        }
    },
};