const aspho = require("./package.json");
console.log(
  "|\n|  ASPHODEL (c) 2021\n|\n|  All from salty-sweet's blood, sweat, and nightly tears.\n|  http://github.com/salty-sweet/asphodel-bot\n|"
);

const fs = require("fs");
const Discord = require("discord.js");

let { token, prefix, data, logs, errors } = require("./config.json");

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

// client.commands = new Discord.Collection();
// const commandFiles = fs
//   .readdirSync("./asphodel/commands")
//   .filter((file) => file.endsWith(".js"));

// for (const file of commandFiles) {
//   const command = require(`./asphodel/commands/${file}`);
//   client.commands.set(command.name, command);
//   console.log(`Added command: ${command.name}`);
// }

const commands = new Map();

const fileNames = fs.readdirSync('./asphodel/commands');
for (let fileName of fileNames) {
    const Command = require(`./asphodel/commands/${fileName}`);
    const command = new Command();
    if (!command.name) continue;

    commands.set(command.name, command);
}
console.log(`Loaded ${commands.size} commands`);

async function SendResponse() {
  let response = new Discord.MessageEmbed().setColor("#ff0049");
  response = new Discord.MessageEmbed()
    .setTitle(`📕 **${client.user.username} Chat Commands**`)
    .setDescription(
      `Here are some of **${client.user.username}**'s chat commands.\nDon't forget to add the **\`${prefix}\`** prefix in these commands!\n\u200B`
    )
    .setTimestamp();
}

for (const command of client.commands.values()) {
  response.addField(`**\`${prefix}${command.name}\`**`, command.description);
}

client.once("ready", () => {
  console.log(
    `Logged in as ${client.user.tag}. Now identifying self as ${client.user.username}.`
  );

  client.user.setPresence({
    status: "online",
    activity: {
      name: ">>help",
      type: "WATCHING",
    },
  });

  console.log(`Asphodel is up and ready for work.`);
});

client.on("unhandledRejection", (error) => {
    fs.appendFile('./data/error.log', `${error}`, function (err) {
        if (err) throw err;
    })
    console.error("ERROR: Find the log at src/data/error.log");
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

 if (!msg.content.startsWith(prefix)) return;

  const name = msg.content
    .split(' ')[0]
    .slice(prefix.length);

  const args = msg.content
    .split(' ')
    .slice(1);

  const command = commands.get(name);
  try {
    await command?.execute(msg, ...args);
  }
  catch (error) {
    await msg.channel.send(`⚠ ${error?.message ?? 'Unknown error.'}`);
    fs.appendFile('./data/command-err.log', `${error}`, (err) =>{
        if (err) throw err;
    })
  }
  return command;
});

client.login(token);
