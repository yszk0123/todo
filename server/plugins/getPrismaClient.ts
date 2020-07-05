import { PrismaClient } from '@prisma/client';

// Store instance for serverless
let client: PrismaClient;

export function getPrismaClient(): PrismaClient {
  if (!client) {
    client = new PrismaClient();
  }

  return client;
}
