import crypto from "crypto";

// Function to capitalize alphabetic characters in a string
function capitalizeAlphabetic(inputString: string) {
  // Split the string into an array of characters
  const chars = inputString.split("");

  // Iterate over each character
  for (let i = 0; i < chars.length; i++) {
    // Check if the character is alphabetic
    if (/[a-zA-Z]/.test(chars[i])) {
      // Capitalize the character
      chars[i] = chars[i].toUpperCase();
    }
  }

  // Join the characters back into a string
  return chars.join("");
}

export default function generateRandomHash(length: number) {
  // Generate a random string (for example purposes)
  const randomString = Math.random().toString(36).substring(2);

  // Create a hash object using the SHA-256 algorithm
  const hash = crypto.createHash("sha256");

  // Update the hash object with the random string
  hash.update(randomString);

  // Get the hexadecimal digest of the hash
  const randomHash = hash.digest("hex").slice(0, length);
  return capitalizeAlphabetic(randomHash);
}
