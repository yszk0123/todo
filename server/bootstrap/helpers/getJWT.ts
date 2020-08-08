// FIXME: Nexus.js ignores types.d.ts...
// @ts-ignore
import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET ?? '__NULL__';
if (secret === '__NULL__') {
  throw new Error('process.env.JWT_SECRET is required');
}

export type Token = {
  exp: number;
  iat: number;
  userId: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getJWT(req: any): Promise<Token> {
  const token = (await jwt.getToken({ req, secret })) as Token;
  return token;
}
