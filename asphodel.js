/**
 * Debug Loggers for Asphodel-Bot
 * Add the names of debug loggers to enable as a launch parameter.
 * 
 * ex: node asphodel.js ASPHODEL-BOT:discord ASPHODEL-BOT:slash      
 */
const debug = require('debug')('ASPHODEL-BOT');     // ASPHODEL-BOT ............. General debug info
const debugModules = debug.extend('node');          // ASPHODEL-BOT:modules ..... NodeJS module loading debugger
const debugDiscord = debug.extend('discord');       // ASPHODEL-BOT:discord ..... DiscordJS debug info
const debugSlash = debug.extend('slash');           // ASPHODEL-BOT:slash ....... Slash commands debug info

console.log(process.argv.slice(2).join(" "));
require('debug').enable(process.argv.slice(2).join(" "));

debug('App waking up'.padEnd(57, ' '));
debugModules('Loading Node.JS modules'.padEnd(52, ' '))


const fs = require('fs');
debugModules('Loaded filesystem'.padEnd(52, ' '))

fs.stat("./.firstrun", (error, stats) => {
    if (error) {
      debug();
      fs.writeFile('./.firstrun', '', function (err) {
        if (err) return console.log(err);
      });
    }
    else {
      console.log(stats);
      console.log("Path is file:", stats.isFile());
      console.log("Path is directory:", stats.isDirectory());
    }
  });

const SaltLogger = require('./asphodel/utils');
debugModules('Loaded asphodel/utils'.padEnd(52, ' '))

const Discord = require('discord.js');
debugModules('Loaded discord.js'.padEnd(52, ' '))
require('discord-reply');
debugModules('Loaded discord-Reply'.padEnd(52, ' '));

require('dotenv').config();
debugModules('Loaded dotenv config'.padEnd(52, ' '))

console.log(require('gradient-string').atlas.multiline([
    "-----------------------------------------------------------",
    "  Asphodel Discord Bot (c) 2021                            ",
    "  http://github.com/salty-sweet/asphodel-bot               ",
    "-----------------------------------------------------------"
].join('\n')));
debugModules('Displayed the pretty as f*ck Splash Text'.padEnd(52, ' '))

debug('Node.JS Modules loaded'.padEnd(57, ' '));
debugDiscord('Initializing Discord.JS bot'.padEnd(49, ' '));

//! THIS IS WHERE COMMANDS ARE DYNAMICALLY FOUND AND REGISTERED
const guildId = process.env.GUILD_ID;

const client = new Discord.Client();
debugDiscord('Client created'.padEnd(49, ' '));

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./asphodel/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./asphodel/commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Added command: ${command.name}`);
}
//! THIS IS WHERE COMMANDS ARE DYNAMICALLY FOUND AND REGISTERED

/**
 * Get Discord's Bot Application API.
 * @param  guildId  The Discord Server's ID to send.
 */
const getApp = (guildId) => {
    const app = client.api.applications(client.user.id);
    if (guildId) {
        app.guilds(guildId);
    }
    return app;
}

/// ASYNC REPLY FUNCTION
const reply = async (interaction, response) => {
    let data = {
        content: response,
    }

    if (typeof response === 'object') {
        data = await createAPIMessage(interaction, response);
    }

    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data
        }
    });
}

/// ASYNC CREATE API MESSAGE FUNCTION
const createAPIMessage = async (interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
        client.channels.resolve(interaction.channel_id),
        content
    ).resolveData()
        .resolveFiles();

    return { ...data, files };
}
debugDiscord('Async Slash Command functions declared'.padEnd(49, ' '));

/// on message
client.on('message', async message => {
    if (!message.author.bot) {
        const linkRegexCondition = /((https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord.com\/invite)\/+[a-zA-Z0-9]{1,16})/g;
        const detectedLinks = message.content.match(linkRegexCondition);
        if (detectedLinks != null) {
            message.delete({ reason: "Message contains a Discord Invite link.", timeout: 1000 })
                .then(msg => {
                    SaltLogger.log(`Deleted message from ${msg.author.username}`);
                    SaltLogger.log(`Message: "${message.content}"`)
                })
                .catch(console.error);
        }
    }
});
debugDiscord('Event %o hooked'.padEnd(40, ' '), 'onMessage');

client.once('ready', async () => {
    debug('Discord.JS Bot initialized'.padEnd(57, ' '));
    SaltLogger.log(`Logged in as ${client.user.tag}.`);
    SaltLogger.log(`Now identifying self as ${client.user.username}.`);

    // get all slash commands in guild
    const commands = await getApp(guildId).commands.get();

    if (commands) {
        for (const command of commands) {
            const { id } = command;
            await getApp(guildId).commands(id).delete();
        }
    }

    // create a slash command in guild
    await getApp(guildId).commands.post({
        data: {
            name: 'gnip',
            description: 'A simple gnip gnop command'
        }
    });

    debugSlash('%O'.padEnd(52, ' '), await getApp(guildId).commands.get());

    // // await getApp(guildId).commands.post({
    // //     data: {
    // //         name: 'embed',
    // //         description: 'A simple embed command',
    // //         options: [{
    // //             name: 'name',
    // //             description: 'Your name',
    // //             required: true,
    // //             type: 3
    // //         }, {
    // //             name: 'age',
    // //             description: 'Your age',
    // //             required: false,
    // //             type: 4
    // //         }]
    // //     }
    // // });

    // //await getApp(guildId).commands.('').delete();

    // detect when a slash command is fired
    client.ws.on('INTERACTION_CREATE', async (interaction) => {

        //! THIS IS WHERE DYNAMICALLY FOUND COMMANDS ARE PARSED
        try {
            const results = client.commands.get(command).execute(client, message, args);
            
        } catch (error) {
            console.error(error);
            message.reply('an unhandled error occured. I should make a report about it.');
        }
        //! THIS IS WHERE DYNAMICALLY FOUND COMMANDS ARE PARSED
        
        const { options } = interaction.data;
        const command = interaction.data.name.toLowerCase()

        const args = {}

        debugSlash('%j'.padEnd(64, ' '), options)

        if (options) {
            for (const option of options) {
                const { name, value } = option;

                args[name] = value;
            }
        }

        debugSlash('%j'.padEnd(64, ' '), args)


        if (command === 'gnip') {
            reply(interaction, '!gnop')
        } else if (command === 'embed') {
            const embed = new Discord.MessageEmbed()
                .setTitle('Cool Thing');

            for (const arg in args) {
                const value = args[arg]
                embed.addField(arg, value)
            }

            reply(interaction, embed)
        }
    })

    // [SECTION] Launch Finalization
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "senpai!  |  v0.1slash",
            type: "WATCHING"
        }
    }).then(() => { debug('Presence modified'.padEnd(57, ' ')) });


    SaltLogger.log(`${client.user.username} is up and ready for work.`);
});
debugDiscord('Event %o hooked'.padEnd(44, ' '), 'ready');


client.login(process.env.TOKEN).then(() => {
    debugDiscord(`Logged in as %o`.padEnd(49 - client.user.tag.length, ' '), client.user.tag)
});
debugDiscord('Logging in using %o from environment'.padEnd(40, ' '), 'BOT_TOKEN');