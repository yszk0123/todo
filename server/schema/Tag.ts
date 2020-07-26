import { schema } from 'nexus';

schema.objectType({
  name: 'Tag',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.name();
    t.model.color();
    t.model.archivedAt();
    t.model.owner();
    t.model.parent();
    t.model.categories();
    t.model.todos();
  },
});
