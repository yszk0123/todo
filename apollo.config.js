module.exports = {
  client: {
    name: 'client',
    includes: ['client/**/*.tsx', 'client/graphql/*.graphql', 'pages/**/*.tsx'],
    excludes: ['client/**/graphql/__generated__/*.*'],
    tagName: 'gql',
    target: 'typescript',
    addTypename: true,
    service: {
      name: 'todo',
      localSchemaFile: './api.graphql',
    },
  },
};
