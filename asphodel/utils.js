const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;
const gradient = require('gradient-string');

this.log = (message) => {
        console.log(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${gradient.atlas(message)}`)
}

this.error = (message) => {
    console.error(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${chalk.bold.hex('#E45865')(`[!] `)}Error: ${message}`)
}

this.warn = (message) => {
    console.error(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${chalk.bold.hex('#FCC771')(`[Warning] `)}${message}`)
}

this.ParseUsertag = (Discord, userTag, type) => {
    if (userTag.startsWith('<') && userTag.endsWith('>')) {
        userTag = userTag.slice(1, -1);

        switch (type) {
            case 'user':
                if (userTag.startsWith('@')) {
                    userTag = userTag.slice(1);
                    if (userTag.startsWith('!')) {
                        userTag = userTag.slice(1);
                    }
                    return new Discord.User(userTag);
                } else {
                    return new Discord.User(userTag);
                }
                break;
            case 'role':
                if (userTag.startsWith('!')) {
                    userTag = userTag.slice(1);
                }
                break;
            case 'channel':
                if (userTag.startsWith('!')) {
                    userTag = userTag.slice(1);
                }
                break;
        }
    }
}

module.exports = this;