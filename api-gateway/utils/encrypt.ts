import crypto from "crypto";

const PUBLIC_KEY = process.env.PROJECT_PUBLIC_KEY as string;

function encryptMessageWithPublicKey(message: {}) {
  const bufferMessage = Buffer.from(JSON.stringify(message), "utf-8");
  return crypto.publicEncrypt(PUBLIC_KEY, bufferMessage).toString("base64");
}

export { encryptMessageWithPublicKey };
