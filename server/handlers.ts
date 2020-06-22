// `import` cannot be used here...
// https://www.nexusjs.org/#/references/recipes?id=steps
// https://www.nexusjs.org/#/references/recipes?id=notes

if (process.env.NODE_ENV === 'development') {
  require('nexus').default.reset();
}

const app = require('nexus').default;

require('./schema');

app.assemble();

export const handlers = app.server.handlers;
