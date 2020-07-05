import { schema } from 'nexus';

schema.inputObjectType({
  name: 'DeleteTodoInput',
  definition(t) {
    t.id('id', { required: true });
  },
});

schema.inputObjectType({
  name: 'DeleteTodosByIdInput',
  definition(t) {
    t.list.id('ids', { required: true });
  },
});

schema.inputObjectType({
  name: 'UpdateTodoInput',
  definition(t) {
    t.id('id', { required: true });
    t.string('text', {});
    t.list.id('tags', {});
    t.field('status', { type: 'TodoStatus' });
    t.field('archivedAt', { type: 'DateTime' });
  },
});

schema.inputObjectType({
  name: 'UpdateTodosByIdInput',
  definition(t) {
    t.list.id('ids', { required: true });
    t.string('text', {});
    t.list.id('tags', {});
    t.field('status', { type: 'TodoStatus' });
    t.field('archivedAt', { type: 'DateTime' });
  },
});

schema.mutationType({
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

    t.crud.createOneTodo({
      authorize(_root, args, ctx) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;
        return !!userId && !!ownerId && userId === ownerId;
      },
    });

    t.field('deleteTodo', {
      type: 'Todo',
      args: {
        data: schema.arg({ type: 'DeleteTodoInput', required: true }),
      },
      async authorize(_root, args, ctx) {
        const todoId = args.data.id;
        const userId = ctx.user?.id;

        const todo = await ctx.db.todo.findOne({
          where: { id: todoId },
          select: { ownerId: true },
        });
        const ownerId = todo?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
      async resolve(_root, args, ctx, _info) {
        const todoId = args.data.id;

        const deletedTodo = await ctx.db.todo.delete({ where: { id: todoId } });
        return deletedTodo;
      },
    });

    t.list.field('deleteTodosById', {
      type: 'ID',
      args: {
        data: schema.arg({ type: 'DeleteTodosByIdInput', required: true }),
      },
      async authorize(_root, args, ctx) {
        const todoIds = args.data.ids;
        const userId = ctx.user?.id;

        const todo = await ctx.db.todo.findMany({
          where: { id: { in: todoIds } },
          select: { ownerId: true },
        });
        return !!userId && todo.every((e) => e.ownerId === userId);
      },
      async resolve(_root, args, ctx, _info) {
        const todoIds = args.data.ids;
        await ctx.db.todo.deleteMany({
          where: { id: { in: todoIds } },
        });
        return todoIds;
      },
    });

    t.field('updateTodo', {
      type: 'Todo',
      args: {
        data: schema.arg({ type: 'UpdateTodoInput', required: true }),
      },
      async authorize(_root, args, ctx) {
        const todoId = args.data.id;
        const userId = ctx.user?.id;

        const todo = await ctx.db.todo.findOne({
          where: { id: todoId },
          select: { ownerId: true },
        });
        const ownerId = todo?.ownerId;
        return !!userId && !!ownerId && userId === ownerId;
      },
      async resolve(_root, args, ctx, _info) {
        const todoId = args.data.id;
        const text = args.data.text ?? undefined;
        const tags = (args.data.tags ?? []).map((id) => ({ id }));
        const hasTags = !!args.data.tags;
        const status = args.data.status ?? undefined;
        const archivedAt = args.data.archivedAt ?? undefined;

        const updatedTodo = await ctx.db.todo.update({
          data: {
            text,
            tags: hasTags ? { set: tags } : undefined,
            status,
            archivedAt,
          },
          where: { id: todoId },
        });
        return updatedTodo;
      },
    });

    t.list.field('updateTodosById', {
      type: 'Todo',
      args: {
        data: schema.arg({ type: 'UpdateTodosByIdInput', required: true }),
      },
      async authorize(_root, args, ctx) {
        const todoIds = args.data.ids;
        const userId = ctx.user?.id;

        const todo = await ctx.db.todo.findMany({
          where: { id: { in: todoIds } },
          select: { ownerId: true },
        });
        return !!userId && todo.every((todo) => todo.ownerId === userId);
      },
      async resolve(_root, args, ctx, _info) {
        const todoIds = args.data.ids;
        const text = args.data.text ?? undefined;
        const tags = (args.data.tags ?? []).map((id) => ({ id }));
        const hasTags = !!args.data.tags;
        const status = args.data.status ?? undefined;
        const archivedAt = args.data.archivedAt ?? undefined;

        const updatedTodos = await Promise.all(
          todoIds.map((todoId) =>
            ctx.db.todo.update({
              data: {
                text,
                tags: hasTags ? { set: tags } : undefined,
                status,
                archivedAt,
              },
              where: { id: todoId },
            })
          )
        );
        return updatedTodos;
      },
    });

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
