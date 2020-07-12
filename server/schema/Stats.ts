import { schema } from 'nexus';

schema.objectType({
  name: 'TodoCountByDate',
  definition(t) {
    t.string('date', { nullable: true });
    t.int('count', { nullable: false });
  },
});

type TodoCountByDate = { count: number; time: string | null };

schema.objectType({
  name: 'Stats',
  definition(t) {
    t.list.field('todoCountByDate', {
      type: 'TodoCountByDate',
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;
        const result: TodoCountByDate[] = await ctx.db.queryRaw`
          SELECT
            to_char("archivedAt", 'YYYY-MM-DD') AS date,
            COUNT(*) AS count
          FROM "Todo" as t
          WHERE t."ownerId" = ${userId}
            AND t."archivedAt" >= (CURRENT_DATE - interval '1 months')
          GROUP BY date
          ORDER BY date
        `;
        return result;
      },
    });

    t.int('tagCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.tag.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('categoryCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.category.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('todoCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.todo.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });

    t.int('checkpointCount', {
      async resolve(_root, _args, ctx) {
        if (!ctx.user) {
          return null;
        }
        const userId = ctx.user.id;

        return ctx.db.checkpoint.count({
          where: { ownerId: { equals: userId } },
        });
      },
    });
  },
});
