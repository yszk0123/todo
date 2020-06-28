import { schema } from 'nexus';

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.name();
    t.model.owner();
    t.model.categories();
    t.model.todos();
  },
});
