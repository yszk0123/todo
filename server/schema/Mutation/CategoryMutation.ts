import { schema } from 'nexus';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCategory({
      authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.updateOneCategory({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const categoryId = args.where.id;
        if (categoryId == null) {
          return false;
        }

        const category = await ctx.db.category.findOne({
          where: { id: categoryId },
          select: { ownerId: true },
        });
        const ownerId = category?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.crud.deleteOneCategory({
      async authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const categoryId = args.where.id;
        if (categoryId == null) {
          return false;
        }

        const category = await ctx.db.category.findOne({
          where: { id: categoryId },
          select: { ownerId: true },
        });
        const ownerId = category?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });
  },
});
