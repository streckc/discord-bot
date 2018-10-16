const say = (msg, args) => {
  msg.channel.send(args.join(' '));
};

const say_help = (verbose=false) => {
  if (verbose) {
    return  'Usage: say <message to repeat>\n\nRepeat the message that follows the command back to the channel.';
  } else {
    return  'Repeat what you want me to say';
  }
}

module.exports = { say, say_help };
