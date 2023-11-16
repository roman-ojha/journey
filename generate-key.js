const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    // using RSA algorithm
    modulusLength: 4096, // bits - standard for RSA keys
    publicKeyEncoding: {
      type: "pkcs1", // Public key crypto standards 1
      format: "pem", // Most common formatting choice
    },
    privateKeyEncoding: {
      type: "pkcs1", // Public key crypto standards 1
      format: "pem", // Most common formatting choice
    },
  });

  const privateKey = keyPair.privateKey;
  const publicKey = keyPair.publicKey;

  // Storing the public key file
  fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

  // Storing the Private key file
  fs.writeFileSync(__dirname + "/id_rsa_priv.pem", privateKey);
}

genKeyPair();
