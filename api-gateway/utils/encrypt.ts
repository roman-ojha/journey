import crypto from "crypto";

const PUBLIC_KEY = process.env.PROJECT_PUBLIC_KEY as string;

function encryptMessageWithPublicKey(message: string) {
  const bufferMessage = Buffer.from(message, "utf-8");
  return crypto.publicEncrypt(PUBLIC_KEY, bufferMessage);
}

export { encryptMessageWithPublicKey };
