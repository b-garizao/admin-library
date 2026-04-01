import type { SanityClient } from "@sanity/client";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'editor';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface CreateLoginFnOptions {
  sanityClient: SanityClient;
  comparePasswordFn?: (password: string, hashed: string) => Promise<boolean>;
}

export const createSanityLoginFn = (options: CreateLoginFnOptions) => {
  const { sanityClient, comparePasswordFn } = options;

  return async (credentials: LoginCredentials): Promise<User> => {
    const user = await sanityClient.fetch<any>(
      `*[_type == "users" && email == $email && isHidden != true][0]{
        _id,
        name,
        email,
        password,
        role
      }`,
      { email: credentials.email }
    );

    if (!user) {
      throw new Error('User not found');
    }

    if (comparePasswordFn) {
      const isValid = await comparePasswordFn(credentials.password, user.password);
      if (!isValid) {
        throw new Error('Invalid password');
      }
    } else {
      if (credentials.password !== user.password) {
        throw new Error('Invalid password');
      }
    }

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  };
};

export const hashPassword = async (_password: string): Promise<string> => {
  console.warn('hashPassword requires bcrypt-ts to be properly imported and configured');
  return _password;
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  console.warn('comparePassword requires bcrypt-ts to be properly imported and configured');
  return password === hashed;
};
