import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../model/User";

const PRIVATE_KEY = process.env.USER_SERVICE_PRIVATE_SECRET_KEY;

// Function to check validation of password
function validPassword(password: string, hash: string, salt: string) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

// Function to generate new password
function generatePassword(password: string) {
  const salt = crypto.randomBytes(32).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hash,
  };
}

// Function which will generate a JWT token
function issuedJWT(user: IUser) {
  const id = user.id;
  const email = user.email;
  const expiresIn = "1y";

  const payload = {
    sub: id,
    email,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expiresIn,
  };
}

export { validPassword, generatePassword, issuedJWT };
