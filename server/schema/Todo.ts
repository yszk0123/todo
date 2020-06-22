import { schema } from 'nexus';

schema.objectType({
  name: 'Todo',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.text();
    t.model.author();
    t.model.authorId();
  },
});
