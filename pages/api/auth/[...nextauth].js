import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { createPrismaAdapter } from '../../../server/plugins/createPrismaAdapter';
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

  adapter: createPrismaAdapter({
    client: getPrismaClient(),
  }),
};

export default (req, res) => NextAuth(req, res, options);
