import { schema, log } from 'nexus';

schema.inputObjectType({
  name: 'DeleteTodoInput',
  definition(t) {
    t.int('id', { required: true });
  },
});

schema.mutationType({
  definition(t) {
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
        const todo = await ctx.db.todo.findOne({ where: { id: todoId } });
        const authorId = todo?.authorId;
        const authorized = !!userId && !!authorId && userId === authorId;
        if (!authorized) {
          throw new Error('Unauthorized');
        }
        const deletedTodo = await ctx.db.todo.delete({ where: { id: todoId } });
        return deletedTodo;
      },
    });
  },
});
