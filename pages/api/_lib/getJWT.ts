import jwt from 'next-auth/jwt';

const secret = process.env.JWT_SECRET ?? '__NULL__';
if (secret === '__NULL__') {
  throw new Error('process.env.JWT_SECRET is required');
}

type User = {
  name: string;
  email: string | null;
  image: string;
};

type Account = {
  provider: string;
  type: string;
  id: number;
  accessToken: string;
};

export type Token = {
  user: User;
  account: Account;
};

export async function getJWT(req: any): Promise<Token> {
  const token = await jwt.getJwt({ req, secret });
  return token;
}
