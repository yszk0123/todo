import { schema } from 'nexus';

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
  },
});
