import { settings } from 'nexus';

settings.change({
  schema: {
    generateGraphQLSDLFile: './server/schema.graphql',
  },
});
