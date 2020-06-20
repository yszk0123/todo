import { schema } from 'nexus';

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

    t.list.field('todos', {
      type: 'Todo',
      resolve(_root, _args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.todo.findMany({
          where: {
            authorId: ctx.user.id,
          },
        });
      },
    });
  },
});
