import { schema } from 'nexus';

// FIXME: Workaround
function castOriginResolve(input: unknown): any {
  return input as any;
}

schema.inputObjectType({
  name: 'DeleteTodoInput',
  definition(t) {
    t.int('id', { required: true });
  },
});

schema.inputObjectType({
  name: 'UpdateTodoInput',
  definition(t) {
    t.int('id', { required: true });
    t.string('text', {});
    t.list.int('tags', {});
    t.field('status', { type: 'TodoStatus' });
    t.field('archivedAt', { type: 'DateTime' });
  },
});

schema.mutationType({
  definition(t) {
    t.crud.createOneCategory({
      resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;

        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return originResolve(root, args, ctx, info);
      },
    });

    t.crud.updateOneCategory({
      async resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const categoryId = args.where.id;
        if (categoryId == null) {
          throw new Error('Invalid input');
        }

        const category = await ctx.db.category.findOne({
          where: { id: categoryId },
          select: { ownerId: true },
        });
        const ownerId = category?.ownerId;
        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return castOriginResolve(originResolve(root, args, ctx, info));
      },
    });

    t.crud.deleteOneCategory({
      async resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const categoryId = args.where.id;
        if (categoryId == null) {
          throw new Error('Invalid input');
        }

        const category = await ctx.db.category.findOne({
          where: { id: categoryId },
          select: { ownerId: true },
        });
        const ownerId = category?.ownerId;
        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return castOriginResolve(originResolve(root, args, ctx, info));
      },
    });

    t.crud.createOneTodo({
      resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const authorId = args.data.author.connect?.id;

        const authorized = !!userId && !!authorId && userId === authorId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return originResolve(root, args, ctx, info);
      },
    });

    t.field('deleteTodo', {
      type: 'Todo',
      args: {
        data: schema.arg({ type: 'DeleteTodoInput', required: true }),
      },
      async resolve(_root, args, ctx, _info) {
        const todoId = args.data.id;
        const userId = ctx.user?.id;

        const todo = await ctx.db.todo.findOne({
          where: { id: todoId },
          select: { authorId: true },
        });
        const authorId = todo?.authorId;
        const authorized = !!userId && !!authorId && userId === authorId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        const deletedTodo = await ctx.db.todo.delete({ where: { id: todoId } });
        return deletedTodo;
      },
    });

    t.field('updateTodo', {
      type: 'Todo',
      args: {
        data: schema.arg({ type: 'UpdateTodoInput', required: true }),
      },
      async resolve(_root, args, ctx, _info) {
        const todoId = args.data.id;
        const text = args.data.text ?? undefined;
        const userId = ctx.user?.id;
        const tags = (args.data.tags ?? []).map((id) => ({ id }));
        const status = args.data.status ?? undefined;
        const archivedAt = args.data.archivedAt ?? undefined;

        const todo = await ctx.db.todo.findOne({
          where: { id: todoId },
          select: { authorId: true },
        });
        const authorId = todo?.authorId;
        const authorized = !!userId && !!authorId && userId === authorId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        const updatedTodo = await ctx.db.todo.update({
          data: { text, tags: { set: tags }, status, archivedAt },
          where: { id: todoId },
        });
        return updatedTodo;
      },
    });

    t.crud.createOneTag({
      resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const ownerId = args.data.owner.connect?.id;

        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return originResolve(root, args, ctx, info);
      },
    });

    t.crud.updateOneTag({
      async resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const tagId = args.where.id;
        if (tagId == null) {
          throw new Error('Invalid input');
        }

        const tag = await ctx.db.tag.findOne({
          where: { id: tagId },
          select: { ownerId: true },
        });
        const ownerId = tag?.ownerId;
        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return castOriginResolve(originResolve(root, args, ctx, info));
      },
    });

    t.crud.deleteOneTag({
      async resolve(root, args, ctx, info, originResolve) {
        const userId = ctx.user?.id;
        const tagId = args.where.id;
        if (tagId == null) {
          throw new Error('Invalid input');
        }

        const tag = await ctx.db.tag.findOne({
          where: { id: tagId },
          select: { ownerId: true },
        });
        const ownerId = tag?.ownerId;
        const authorized = !!userId && !!ownerId && userId === ownerId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }

        return castOriginResolve(originResolve(root, args, ctx, info));
      },
    });
  },
});
