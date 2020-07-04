// FIXME: Nexus.js ignores types.d.ts...
// @ts-ignore
import jwt from 'next-auth/jwt';
import { User, Account } from '@prisma/client';

const secret = process.env.JWT_SECRET ?? '__NULL__';
if (secret === '__NULL__') {
  throw new Error('process.env.JWT_SECRET is required');
}

export type Token = {
  user: User;
  account: Account;
};

export async function getJWT(req: any): Promise<Token> {
  const token = (await jwt.getJwt({ req, secret })) as Token;
  return token;
}
