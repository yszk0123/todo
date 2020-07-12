import { schema } from 'nexus';

schema.inputObjectType({
  name: 'UpdateCheckpointsByIdInput',
  definition(t) {
    t.list.id('ids', { required: true });
    t.string('name', {});
    t.field('endAt', { type: 'DateTime' });
    t.field('archivedAt', { type: 'DateTime' });
  },
});

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

    t.list.field('updateCheckpointsById', {
      type: 'Checkpoint',
      args: {
        data: schema.arg({
          type: 'UpdateCheckpointsByIdInput',
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
        return (
          !!userId &&
          checkpoints.every((checkpoint) => checkpoint.ownerId === userId)
        );
      },
      async resolve(_root, args, ctx, _info) {
        const checkpointIds = args.data.ids;
        const name = args.data.name ?? undefined;
        const endAt = args.data.endAt ?? undefined;
        const archivedAt = args.data.archivedAt ?? undefined;

        const updatedTodos = await Promise.all(
          checkpointIds.map((checkpointId) =>
            ctx.db.checkpoint.update({
              data: {
                name,
                archivedAt,
                endAt,
              },
              where: { id: checkpointId },
            })
          )
        );
        return updatedTodos;
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
