import { createClient, type SanityClient } from '@sanity/client';

export interface SanityClientOptions {
  projectId: string;
  dataset?: string;
  apiVersion?: string;
  useCdn?: boolean;
  token?: string;
}

let client: SanityClient | null = null;

export const initSanityClient = (options: SanityClientOptions): SanityClient => {
  const {
    projectId,
    dataset = 'development',
    apiVersion = '2024-01-01',
    useCdn = false,
    token,
  } = options;

  client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    ...(token && { token }),
  });

  return client;
};

export const getSanityClient = (): SanityClient => {
  if (!client) {
    throw new Error(
      'Sanity client not initialized. Call initSanityClient first.'
    );
  }
  return client;
};

export const sanityClient = {
  init: initSanityClient,
  get: getSanityClient,
};

export default sanityClient;
