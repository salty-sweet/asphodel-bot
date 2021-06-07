const aspho = require('./package.json');
console.log("|\n|  ASPHODEL (c) 2021\n|\n|  All from salty-sweet's blood, sweat, and nightly tears.\n|  http://github.com/salty-sweet/asphodel-bot\n|");

const fs = require('fs');
const Discord = require('discord.js');

let { token, prefix, data, logs, errors } = require('./config.json');

if (token.includes("env$")) {
    let envName = token.split("$")[1];
    let envValue = process.env[envName];

    if (envValue == undefined) {
        console.error(`[ERROR] Environment variable \`${envName}\` is undefined!`);
        process.exit(1002);
    }

    console.log(`Taking Discord Token from \`${envName}\` environment variable.`);
    token = process.env[envName];
}


const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./asphodel/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./asphodel/commands/${file}`);
    client.commands.set(command.name, command);
    console.log(`Added command: ${command.name}`);
}

async function SendResponse() {
    let response = new Discord.MessageEmbed().setColor('#ff0049');
    response = new Discord.MessageEmbed()
        .setTitle(`📕 **${client.user.username} Chat Commands**`)
        .setDescription(`Here are some of **${client.user.username}**'s chat commands.\nDon't forget to add the **\`${prefix}\`** prefix in these commands!\n\u200B`)
        .setTimestamp();

}


for (const command of client.commands.values()) {
    response.addField(`**\`${prefix}${command.name}\`**`, command.description)
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}. Now identifying self as ${client.user.username}.`);

    client.user.setPresence({
        status: 'online',
        activity: {
            name: ">>help",
            type: "WATCHING"
        }
    });

    console.log(`Asphodel is up and ready for work.`);
});

client.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection: ', error);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        const results = client.commands.get(command).execute(client, message, args);

    } catch (error) {
        console.error(error);
        message.reply('an unhandled error occured. I should make a report about it.');
    }
});

client.login(token);
