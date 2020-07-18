import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.categories({
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
            // FIXME: Set from client
            archivedAt: { equals: null },
          },
          orderBy: args.where?.archivedAt ? { archivedAt: 'desc' } : undefined,
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });

    t.crud.category({
      authorize(_root, _args, ctx) {
        return !!ctx.user?.id;
      },
      resolve(root, args, ctx, info, originalResolve) {
        if (!ctx.user?.id) return null;

        const newArgs: typeof args = {
          ...args,
          where: {
            ...args.where,
            id: ctx.user.id,
          },
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });
  },
});
