
const fs = require('fs');
const path = require('path');

const importCommands = () => {
  let commands = {};
  fs.readdirSync(path.dirname(__filename)).forEach((filename) => {
    if (filename.match(/\.js$/) && filename !== 'index.js') {
      console.log('Loading commands: ' + filename.replace('.js', ''));
      const tmp = require('./' + filename);
      commands = Object.assign(commands, tmp);
    }
  });

  return commands;
}

const commands = importCommands();
module.exports = commands;

