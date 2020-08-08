import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { Prisma } from 'next-auth/adapters';
import { getPrismaClient } from '../../../server/plugins/getPrismaClient';

const options = {
  site: process.env.SITE,

  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.Credentials({
      name: 'Username and password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'guest' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials.username === 'guest' &&
          credentials.password === 'test'
        ) {
          const client = getPrismaClient();
          const guestUser = await client.user.findOne({
            where: { email: 'guest@example.com' },
          });
          return guestUser;
        }
        return false;
      },
    }),
  ],

  secret: process.env.SECRET,

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    jwt(decodedJwt, account) {
      return {
        userId: account ? account.userId : null,
        ...decodedJwt,
      };
    },
  },

  adapter: Prisma.Adapter({
    prisma: getPrismaClient(),
  }),
};

export default (req, res) => NextAuth(req, res, options);
