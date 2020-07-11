import { schema } from 'nexus';

const TODO_LIMIT = 100;

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

    t.crud.categories({
      filtering: true,
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

    t.crud.checkpoints({
      filtering: true,
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
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });

    t.crud.todos({
      filtering: true,
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
          first: TODO_LIMIT,
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });

    t.crud.tag({
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

    t.crud.tags({
      filtering: true,
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
        };
        return originalResolve(root, newArgs, ctx, info);
      },
    });
  },
});
