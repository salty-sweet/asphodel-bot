const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;
const gradient = require('gradient-string');

const aspho = require('./package.json');
const SaltLogger = require('./asphodel/utils');
SaltLogger.isVerbose = false;


const fs = require('fs');
const Discord = require('discord.js');
const WOKCommands = require('wokcommands');
const { get } = require('http');
require('dotenv').config();

console.log(gradient.atlas.multiline([
    "                                                           ",
    "  ASPHODEL (c) 2021                                        ",
    "                                                           ",
    "  All from salty-sweet's blood, sweat, and nightly tears.  ",
    "  http://github.com/salty-sweet/asphodel-bot               ",
    "                                                           "
].join('\n')));

const guildId = '415164706441920513';
const client = new Discord.Client();


// const getApp = (guildId) => {
//     const app = client.api.applications(client.user.id);
//     if (guildId) {
//         app.guilds(guildId);
//     }
//     return app;
// }

// const reply = async(interaction, response) => {
//     let data = {
//         content: response,
//     }

//     if (typeof response === 'object') {
//         data = await createAPIMessage(interaction, response);
//     }

//     client.api.interactions(interaction.id, interaction.token).callback.post({
//         data: {
//             type: 4,
//             data
//         }
//     });
// }

// const createAPIMessage = async(interaction, content) => {
//     const { data, files } = await Discord.APIMessage.create(
//             client.channels.resolve(interaction.channel_id),
//             content
//         ).resolveData()
//         .resolveFiles();

//     return {...data, files };
// }

client.once('ready', async() => {
    // [SECTION] Startup Declaration
    SaltLogger.log(`Logged in as ${client.user.tag}.`);
    SaltLogger.verbose(`Now identifying self as ${client.user.username}.`);
    client.user.setPresence({
        status: 'dnd',
    })

    // [SECTION] Initialization
    new WOKCommands(client, {
            commandsDir: 'asphodel/commands',
            testServers: [guildId],
            showWarns: false,
        }).setPrefix('!')
        .setCategorySettings([{
                name: 'Utilities',
                emoji: '🗜️'
            },
            {
                name: 'Moderation',
                emoji: '🛃',
                hidden: true
            },
            {
                // You can change the default emojis as well
                // "Configuration" is ⚙ by default
                name: 'Configuration',
                emoji: '🚧',
                // You can also hide a category from the help menu
                // Admins bypass this
                hidden: true
            }
        ]);

    // await getApp(guildId).commands.post({
    //     data: {
    //         name: 'ping',
    //         description: 'Simple ping pong command!'
    //     }
    // });

    // await getApp(guildId).commands('843472249649889300').delete();

    // await getApp(guildId).commands.post({
    //     data: {
    //         name: 'embed',
    //         description: 'Shows you an embed!',
    //         options: [{
    //             name: 'name',
    //             description: 'Your username.',
    //             required: true,
    //             type: 3 // string
    //         }, {
    //             name: 'age',
    //             description: 'Your age.',
    //             required: false,
    //             type: 4 // int
    //         }]
    //     }
    // })

    // client.ws.on('INTERACTION_CREATE', async(interaction) => {
    //     const { name, options } = interaction.data;
    //     const command = name.toLowerCase();
    //     const args = {};


    //     if (options) {
    //         for (const option of options) {
    //             const { name, value } = option;
    //             args[name] = value;
    //         }
    //     }

    //     console.log(args);

    //     if (command === 'ping') {
    //         reply(interaction, '**Pong!** Poggers, salty! You made a slash command!')
    //     } else if (command === 'embed') {
    //         const embed = new Discord.MessageEmbed()
    //             .setTitle('Example Embed!');

    //         for (const arg in args) {
    //             const value = args[arg];
    //             embed.addField(arg, value);
    //         }

    //         reply(interaction, embed);
    //     }
    // });

    // [SECTION] Launch Finalization
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "senpai!  |  v0.1slash",
            type: "WATCHING"
        }
    });

    SaltLogger.log(gradient.atlas(`${client.user.username} is up and ready for work.`));
});


client.login(process.env.TOKEN);