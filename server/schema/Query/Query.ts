import { schema } from 'nexus';

schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.user ?? null;
      },
    });

    t.field('stats', {
      type: 'Stats',
      resolve() {
        return {};
      },
    });
  },
});
