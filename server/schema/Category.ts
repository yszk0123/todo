import { schema } from 'nexus';

schema.objectType({
  name: 'Category',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.name();
    t.model.owner();
    t.model.todos();
    t.model.tags();
  },
});
