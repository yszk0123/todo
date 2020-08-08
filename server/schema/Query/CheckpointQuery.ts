import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.checkpoints({
      filtering: true,
      ordering: true,
      authorize(_root, _args, ctx) {
        return !!ctx.user?.id;
      },
      resolve(root, args, ctx, info, originalResolve) {
        const newArgs: typeof args = {
          ...args,
          where: {
            ownerId: { equals: ctx.user?.id },
            // FIXME: Set from client
            archivedAt: { equals: null },
          },
          orderBy: args.where?.archivedAt
            ? [{ archivedAt: 'desc' }]
            : [{ endAt: 'asc' }],
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });
  },
});
