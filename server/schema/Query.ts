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
        id: schema.idArg({ required: true }),
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

    t.list.field('checkpoints', {
      type: 'Checkpoint',
      resolve(_root, _args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.checkpoint.findMany({
          where: {
            ownerId: ctx.user.id,
            // FIXME: Set from client
            archivedAt: { equals: null },
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
            ownerId: ctx.user.id,
          },
        });
      },
    });

    t.field('tag', {
      type: 'Tag',
      args: {
        id: schema.idArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        if (!ctx.user?.id) {
          return null;
        }

        return ctx.db.tag.findOne({
          where: {
            id: args.id,
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
