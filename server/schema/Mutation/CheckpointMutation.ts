import { schema } from 'nexus';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCheckpoint({
      authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.updateOneCheckpoint({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const checkpointId = args.where.id;
        if (checkpointId == null) {
          return false;
        }

        const checkpoint = await ctx.db.checkpoint.findOne({
          where: { id: checkpointId },
          select: { ownerId: true },
        });
        const ownerId = checkpoint?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.deleteOneCheckpoint({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const checkpointId = args.where.id;
        if (checkpointId == null) {
          return false;
        }

        const checkpoint = await ctx.db.checkpoint.findOne({
          where: { id: checkpointId },
          select: { ownerId: true },
        });
        const ownerId = checkpoint?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });
  },
});
