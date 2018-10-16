const ping = async (msg, args, client) => {
  const m = await msg.channel.send("Ping?");
  m.edit(`Pong! Latency is ${m.createdTimestamp - msg.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
};

const ping_help = (verbose=false) => {
  if (verbose) {
    return  'Usage: ping\n\nReport the latency of your connection to the Discord server.';
  } else {
    return  'Find out how slow your connection is.';
  }
}

module.exports = { ping, ping_help };
