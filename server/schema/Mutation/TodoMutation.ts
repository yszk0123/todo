import { schema } from 'nexus';

import { EMPTY } from '../../../client/shared/constants/EMPTY';

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
  name: 'DuplicateTodosByIdInput',
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
    t.id('checkpointId', {});
    t.id('parentId', {});
    t.field('archivedAt', { type: 'DateTime' });
  },
});

schema.inputObjectType({
  name: 'UpdateTodosByIdInput',
  definition(t) {
    t.list.id('ids', { required: true });
    t.string('text', {});
    t.id('categoryId', {});
    t.list.id('tags', {});
    t.field('status', { type: 'TodoStatus' });
    t.id('checkpointId', {});
    t.id('parentId', {});
    t.field('archivedAt', { type: 'DateTime' });
  },
});

schema.extendType({
  type: 'Mutation',
  definition(t) {
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

    t.list.field('duplicateTodosById', {
      type: 'ID',
      args: {
        data: schema.arg({ type: 'DuplicateTodosByIdInput', required: true }),
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
        const todos = await ctx.db.todo.findMany({
          where: { id: { in: todoIds } },
          include: { tags: { select: { id: true } } },
        });
        const duplicatedTodoIds = Promise.all(
          todos.map(async (todo) => {
            const duplicatedTodo = await ctx.db.todo.create({
              data: {
                text: todo.text,
                archivedAt: todo.archivedAt,
                checkpoint: { connect: { id: todo.checkpointId ?? undefined } },
                // createdAt: todo.createdAt,
                status: todo.status,
                tags: { connect: todo.tags.map((tag) => ({ id: tag.id })) },
                parent: { connect: { id: todo.parentId ?? undefined } },
                category: { connect: { id: todo.categoryId } },
                owner: { connect: { id: todo.ownerId } },
              },
            });
            return duplicatedTodo.id;
          })
        );
        return duplicatedTodoIds;
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
        const tags = (args.data.tags ?? EMPTY).map((id) => ({ id }));
        const hasTags = !!args.data.tags;
        const status = args.data.status ?? undefined;
        const archivedAt = args.data.archivedAt ?? undefined;
        const checkpointId = args.data.checkpointId ?? undefined;
        const parentId = args.data.parentId ?? undefined;

        const updatedTodo = await ctx.db.todo.update({
          data: {
            text,
            tags: hasTags ? { set: tags } : undefined,
            status,
            archivedAt,
            checkpoint: checkpointId
              ? { connect: { id: checkpointId } }
              : undefined,
            parent: parentId ? { connect: { id: parentId } } : undefined,
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
        const tags = (args.data.tags ?? EMPTY).map((id) => ({ id }));
        const hasTags = !!args.data.tags;
        const status = args.data.status ?? undefined;
        const archivedAt = args.data.archivedAt;
        const categoryId = args.data.categoryId ?? undefined;
        const checkpointId = args.data.checkpointId;
        const parentId = args.data.parentId ?? undefined;

        const updatedTodos = await Promise.all(
          todoIds.map((todoId) =>
            ctx.db.todo.update({
              data: {
                text,
                tags: hasTags ? { set: tags } : undefined,
                status,
                archivedAt,
                category: categoryId
                  ? { connect: { id: categoryId } }
                  : undefined,
                checkpoint:
                  checkpointId === null
                    ? { disconnect: true }
                    : checkpointId
                    ? { connect: { id: checkpointId } }
                    : undefined,
                parent: parentId ? { connect: { id: parentId } } : undefined,
              },
              where: { id: todoId },
            })
          )
        );
        return updatedTodos;
      },
    });
  },
});
