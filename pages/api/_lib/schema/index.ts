import { use, schema } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { getJWT, Token } from '../getJWT';
import { User } from '@prisma/client';

use(
  prisma({
    features: {
      crud: true,
    },
  })
);

// Prevent nexus build error
// > node_modules/@types/typegen-nexus-context/index.d.ts:15:58 - error TS1005: ',' expected.
// > 15 interface Context { token: Token; } | { token?: undefined; }
// @see https://github.com/graphql-nexus/nexus/pull/1057
const add = schema.addToContext;
add(async (req) => {
  try {
    const token = await getJWT(req);
    return { token };
  } catch {
    return {};
  }
});

declare global {
  interface NexusContext {
    user?: User;
  }
}

schema.middleware(
  (_config) => async (source, args, ctx: NexusContext, info, next) => {
    // FIXME
    const token: Token | null | undefined = (ctx as any).token;

    if (token && token.user.email) {
      const name = token.user.name;
      const email = token.user.email;
      let user = await ctx.db.user.findOne({ where: { email } });
      if (!user) {
        user = await ctx.db.user.create({
          data: {
            name,
            email,
          },
        });
      }
      ctx.user = user ?? undefined;
      return next(source, args, ctx, info);
    }

    return next(source, args, ctx, info);
  }
);

schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.user ?? null;
      },
    });

    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
  },
});
