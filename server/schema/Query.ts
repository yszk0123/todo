import { schema } from 'nexus';

schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.user ?? null;
      },
    });

    t.field('category', {
      type: 'Category',
      args: {
        id: schema.intArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.category.findOne({
          where: {
            id: args.id,
          },
        });
      },
    });

    t.list.field('categories', {
      type: 'Category',
      resolve(_root, _args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.category.findMany({
          where: {
            ownerId: ctx.user.id,
          },
        });
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

    t.list.field('tags', {
      type: 'Tag',
      resolve(_root, _args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.tag.findMany({
          where: {
            ownerId: ctx.user.id,
          },
        });
      },
    });
  },
});
