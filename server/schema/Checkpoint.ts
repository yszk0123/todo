import { schema } from 'nexus';

schema.objectType({
  name: 'Checkpoint',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.endAt();
    t.model.archivedAt();
    t.model.ownerId();
  },
});
