module.exports = {
  client: {
    name: 'client',
    includes: ['client/**/graphql/*.graphql'],
    excludes: ['client/**/graphql/__generated__/*.*'],
    tagName: 'gql',
    target: 'typescript',
    addTypename: true,
    service: {
      name: 'todo',
      localSchemaFile: './apollo.graphql',
    },
  },
};
