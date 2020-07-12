import { schema } from 'nexus';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneTag({
      authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.updateOneTag({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const tagId = args.where.id;
        if (tagId == null) {
          return false;
        }

        const tag = await ctx.db.tag.findOne({
          where: { id: tagId },
          select: { ownerId: true },
        });
        const ownerId = tag?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.deleteOneTag({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const tagId = args.where.id;
        if (tagId == null) {
          return false;
        }

        const tag = await ctx.db.tag.findOne({
          where: { id: tagId },
          select: { ownerId: true },
        });
        const ownerId = tag?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });
  },
});
