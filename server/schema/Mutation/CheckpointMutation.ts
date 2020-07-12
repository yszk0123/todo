import { schema } from 'nexus';

schema.inputObjectType({
  name: 'DeleteCheckpointsByIdInput',
  definition(t) {
    t.list.id('ids', { required: true });
  },
});

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

    t.list.field('deleteCheckpointsById', {
      type: 'ID',
      args: {
        data: schema.arg({
          type: 'DeleteCheckpointsByIdInput',
          required: true,
        }),
      },
      async authorize(_root, args, ctx) {
        const checkpointIds = args.data.ids;
        const userId = ctx.user?.id;

        const checkpoints = await ctx.db.checkpoint.findMany({
          where: { id: { in: checkpointIds } },
          select: { ownerId: true },
        });
        return !!userId && checkpoints.every((e) => e.ownerId === userId);
      },
      async resolve(_root, args, ctx, _info) {
        const checkpointIds = args.data.ids;
        await ctx.db.checkpoint.deleteMany({
          where: { id: { in: checkpointIds } },
        });
        return checkpointIds;
      },
    });
  },
});
