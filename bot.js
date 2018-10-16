const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const commands = require('./commands');

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + '!');
  console.log('Commands: ' + Object.getOwnPropertyNames(commands).filter(cmd => !cmd.match(/help/)).sort().join(', '));
  client.user.setPresence({ game: { name: '!help to get assistance', type: 0 } })
});


const showHelp = (msg, cmd, args, commands) => {
  let help = 'Command help:';
  for (command in commands) {
    if (command.match('help')) {
      const shortCmd = command.split('_')[0];
      if (args.includes(shortCmd))  {
        return msg.channel.send(commands[command](true));
      } else {
        help = help + '\n  - ' + shortCmd + ' : ' + commands[command]();
      }
    }
  }
  return msg.channel.send(help);
}


client.on('message', msg => {
  // Ignore other bot messages
  if(msg.author.bot) return;

  // Ignore message that does not start with prefix
  if(msg.content.indexOf(config.prefix) !== 0) return;

  const args = parseMessage(msg.content);
  const cmd = args.shift().toLowerCase();

  if (cmd === 'help') {
    console.log('Command: (', msg.author.username, ')', cmd, args.join(' '));
    showHelp(msg, cmd, args, commands);
  } else if (cmd in commands) {
    console.log('Command: (', msg.author.username, ')', cmd, args.join(' '));
    return commands[cmd](msg, args, client);
  } else {
    console.log('Unknown command: (', msg.author.username, ')', cmd, args.join(' '));
  }
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');

  if (!channel) return;

  channel.send('Welcome to the server, ' + member.nickname + '!');
});

client.login(config.token).catch( e => {
  console.log("Incorrect discord bot token");
});

client.on('guildMemberAvailable', member => {
  console.log('Member available: ' + member.nicname);
});

client.on('guildMemberUnavailable', member => {
  console.log('Member not available: ' + member.nicname);
});

const parseMessage = (msg) => {
  return args = msg.substring(config.prefix.length).split(' ');
};

