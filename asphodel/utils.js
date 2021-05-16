const chalk = require('chalk');
chalk.enabled = true;
chalk.level = 3;

this.isVerbose = false;

this.log = function(message) {
        console.log(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${message}`)
}

this.error = function(message) {
    console.error(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${chalk.bold.hex('#E45865')(`[!] `)}Error: ${message}`)
}

this.warn = function(message) {
    console.error(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${chalk.bold.hex('#FCC771')(`[Warning] `)}${message}`)
}

this.verbose = function(message) {
    if (this.isVerbose) console.log(`${chalk.hex('#2E505B')(`[${new Date().toLocaleTimeString()}] `)}${chalk.bold.hex('#D8004D')(`<VERBOSE> `)}${message}`)
}

this.SetVerbose = function(value) {
    this.SetVerbose = value;
}

module.exports = this;