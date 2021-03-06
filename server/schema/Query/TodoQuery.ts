import { schema } from 'nexus';

export const TODO_LIMIT = 100;

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.todo({
      authorize(_root, _args, ctx) {
        return !!ctx.user?.id;
      },
      async resolve(root, args, ctx, info, originalResolve) {
        if (!args.where.id) return null;

        const todo = await originalResolve(root, args, ctx, info);
        return todo?.ownerId === ctx.user?.id ? todo : null;
      },
    });

    t.crud.todos({
      filtering: true,
      ordering: true,
      authorize(_root, _args, ctx) {
        return !!ctx.user?.id;
      },
      resolve(root, args, ctx, info, originalResolve) {
        if (!ctx.user?.id) return [];

        const newArgs: typeof args = {
          ...args,
          where: {
            ...args.where,
            ownerId: { equals: ctx.user.id },
          },
          orderBy: args.where?.archivedAt
            ? [{ archivedAt: 'desc' }]
            : undefined,
          first: TODO_LIMIT,
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });
  },
});
