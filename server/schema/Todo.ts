import { schema } from 'nexus';

schema.objectType({
  name: 'Todo',
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.text();
    t.model.owner();
    t.model.ownerId();
    t.model.category();
    t.model.categoryId();
    t.model.tags({ ordering: true });
    t.model.status();
    t.model.archivedAt();
  },
});
