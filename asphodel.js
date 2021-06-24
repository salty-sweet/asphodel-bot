const debug = require('debug')('ASPHODEL-BOT');
const debugModules = debug.extend('node');
const debugDiscord = debug.extend('discord');
const debugSlash = debug.extend('slash');
console.log(process.argv.slice(2).join(" "));
require('debug').enable(process.argv.slice(2).join(" "));
// console.log(process.env.DEBUG_NAMES);
// require('debug').enable(process.env.DEBUG_NAMES);
debug('App waking up');
debugModules('Loading Node.JS modules')

/// Custom log formatting
const SaltLogger = require('./asphodel/utils');
debugModules('Loaded asphodel/utils')


/// Discord Bot Implementation Requires
const fs = require('fs');
debugModules('Loaded filesystem')
const Discord = require('discord.js');
debugModules('Loaded discord.js')
const { get } = require('http');
debugModules('Loaded http')
require('discord-reply');
debugModules('Loaded discord-Reply');
require('dotenv').config();
debugModules('Loaded dotenv config')

console.log(require('gradient-string').atlas.multiline([
    "-----------------------------------------------------------",
    "  Asphodel Discord Bot (c) 2021                            ",
    "  http://github.com/salty-sweet/asphodel-bot               ",
    "-----------------------------------------------------------"
].join('\n')));
debugModules('Displayed the pretty as f*ck Splash Text')

debug('Node.JS Modules loaded');
debugDiscord('Initializing Discord.JS bot');

const guildId = process.env.GUILD_ID;

const client = new Discord.Client();
debugDiscord('Client created');

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
const reply = async(interaction, response) => {
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
const createAPIMessage = async(interaction, content) => {
    const { data, files } = await Discord.APIMessage.create(
            client.channels.resolve(interaction.channel_id),
            content
        ).resolveData()
        .resolveFiles();

    return {...data, files };
}
debugDiscord('Async Slash Command functions declared');

/// on message
client.on('message', async message => {
    if (!message.author.bot) {
        const linkRegexCondition = /((https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite|discord.com\/invite)\/+[a-zA-Z0-9]{1,16})/g;
        const detectedLinks = message.content.match(linkRegexCondition);
        if (detectedLinks != null) {
            // message.lineReply(`Result: \`\`\`json\n${JSON.stringify(detectedLinks, null, 2)}\`\`\``);
            message.delete({ reason: "Message contains a Discord Invite link.", timeout: 1000 })
                .then(msg => {
                    SaltLogger.log(`Deleted message from ${msg.author.username}`);
                    SaltLogger.log(`Message: "${message.content}"`)
                })
                .catch(console.error);
        }
    }
});
debugDiscord('Event %o hooked.', 'onMessage');

client.once('ready', async() => {
    debug('Discord.JS Bot initialized');
    SaltLogger.log(`Logged in as ${client.user.tag}.`);
    SaltLogger.log(`Now identifying self as ${client.user.username}`);

    // get all slash commands in guild
    const commands = await getApp(guildId).commands
        .get()
        .then(() => { debug('Bot commands loaded') });

    // [SECTION] Launch Finalization
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "senpai!  |  v0.1slash",
            type: "WATCHING"
        }
    }).then(() => { debug('Presence modified') });


    SaltLogger.log(`${client.user.username} is up and ready for work.`);
});
debugDiscord('Event %o hooked', 'ready');


client.login(process.env.TOKEN).then(() => {
    debugDiscord(`Logged in as %o`, client.user.tag)
});
debugDiscord('Logging in using %o from environment', 'BOT_TOKEN');