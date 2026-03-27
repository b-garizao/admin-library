import { genSalt, hash, compare } from "bcrypt-ts";

/**
 * Hash a plain text password using bcrypt.
 * Recommended rounds: 10
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

/**
 * Compare a plain text password with a hashed version.
 */
export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return compare(password, hashed);
};
