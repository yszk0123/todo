import { schema } from 'nexus';

schema.objectType({
  name: 'Stats',
  definition(t) {
    t.int('tagCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.tag.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('categoryCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.category.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('todoCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.todo.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('checkpointCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.checkpoint.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });
  },
});
