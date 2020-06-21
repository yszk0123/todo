module.exports = {
  client: {
    name: 'client',
    includes: ['lib/**/*.tsx', 'lib/graphql/*.graphql', 'pages/**/*.tsx'],
    excludes: ['lib/**/graphql/__generated__/*.*'],
    tagName: 'gql',
    target: 'typescript',
    addTypename: true,
    service: {
      name: 'todo',
      localSchemaFile: './api.graphql',
    },
  },
};
