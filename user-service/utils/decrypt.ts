import crypto from "crypto";

const PRIVATE_KEY = process.env.PROJECT_PRIVATE_KEY as string;

function decryptMessageWithPrivateKey(encryptedMessage: string) {
  console.log(encryptedMessage);
  return crypto
    .privateDecrypt(PRIVATE_KEY, Buffer.from(encryptedMessage, "base64"))
    .toString();
}

export { decryptMessageWithPrivateKey };
