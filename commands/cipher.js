const cipher = (msg, args) => {
  if (args.length > 0) {
    const cipher = args.shift();
    const message = args.join(' ');

    if (message) {
      if (cipher.match(/^rot[0-9]*$/i)) {
        const rotation = parseInt(cipher.replace(/[^0-9]/g, ''), 10);
        msg.channel.send(cipher_rot(rotation, message));
      } else {
        msg.channel.send('The cipher of "' + cipher + '" is not known by me.... yet.');
      }
    } else {
      msg.channel.send(cipher_rot_help());
    }
  } else {
    msg.channel.send(cipher_help(true));
  }
};

const cipher_help = (verbose=false) => {
  if (verbose) {
    return  'Usage: cipher <cipher> [<cipher params>] <message to code>\n\nEncode the message with the cipher specified.  Supported ciphers are:\n - rot<0-26>';
  } else {
    return  'Encode the a message with a cipher.';
  }
}

const cipher_rot = (rotation, message) => {
  const encoded = [];
  for (let x = 0; x < message.length; x++) {
    let ord = message.charCodeAt(x);

    if (message[x].match(/^[A-Za-z]$/)) {
      ord -= rotation;
    }

    if (message[x].match(/^[a-z]$/) && ord < 'a'.charCodeAt(0)) {
      ord += 26;
    } else if (message[x].match(/^[A-Z]$/) && ord < 'A'.charCodeAt(0)) {
      ord += 26;
    }

    encoded.push(String.fromCharCode(ord));
  }

  console.log('Cipher: ' + encoded.join(''));
  return encoded.join('');
}

const cipher_rot_help = () => {
    return  'The ROT cipher is a single-alphabet substitution cipher based on rotation of letters.  Each letter in the alphabet is rotated # of times specified by the number in the cipher.  Example: for a rot3, "d" becomes "a", "e" becomes "b" and so on.\n\nThe rotation cipher was made popular by the Roman General Julius Caeser, as it was a method he used to communicate with his generals.';
}

module.exports = { cipher, cipher_help };
