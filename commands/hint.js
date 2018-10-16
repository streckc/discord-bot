const hints = require('../hints.json');

let nextHint = {};

const hint = (msg, args) => {
  if (args.length < 1) {
    msg.channel.send('Hints... hints for the poor!');
  } else if (args[0]) {
    const challenge = args[0];
    if (Object.keys(hints).includes(challenge)) {
      if (!Object.keys(nextHint).includes(challenge) || nextHint[challenge] < Date.now()) {
        const rand = Math.floor(Math.random() * hints[challenge].length);
        msg.channel.send(hints[challenge][rand]);
        nextHint[challenge] = Date.now() + 5000;
      } else {
        msg.channel.send('Another ' + challenge + ' hint? So soon?');
      }
    } else {
      msg.channel.send('No hints for ' + challenge + '!');
    }
  }
};

const hint_help = (verbose=false) => {
  if (verbose) {
    return  'Usage: hint <challenge>\n\nProvides a random hint for a challenge.';
  } else {
    return  'Provides a random hint for a challenge.';
  }
}

module.exports = { hint, hint_help };
