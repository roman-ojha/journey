const crypto = require("crypto");
const fs = require("fs");

function genAsymmetricKey() {
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

function genSymmetricKey() {
  // Generate a random 256-bit (32-byte) key
  const symmetricKey = crypto.randomBytes(56);

  // Convert the key to a hex string for storage or transmission
  const symmetricKeyHex = symmetricKey.toString("hex");

  // Store or use the symmetricKeyHex as needed
  console.log("Generated Symmetric Key:", symmetricKeyHex);
}

// genAsymmetricKey();

genSymmetricKey();
