/**
 * Hash a plain text password using bcrypt.
 * Recommended rounds: 10
 */
export declare const hashPassword: (password: string) => Promise<string>;
/**
 * Compare a plain text password with a hashed version.
 */
export declare const comparePassword: (password: string, hashed: string) => Promise<boolean>;
