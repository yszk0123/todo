import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import introspectionResult from '../shared/graphql/__generated__/introspectionResult';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../shared/graphql/__generated__/Page.graphql';
import { isSSR } from '../shared/helpers/isSSR';

export function createApolloClient() {
  const ssr = isSSR();

  const cache = new InMemoryCache({
    possibleTypes: introspectionResult.__schema,
  });

  const client = new ApolloClient({
    cache,
    link: new HttpLink({
      uri: '/api/graphql',
    }),
    ssrMode: ssr,
    resolvers: {},
  });

  initializeCache(cache);

  return client;
}

function initializeCache(cache: InMemoryCache) {
  cache.writeQuery<PageIsSyncingQuery>({
    query: PageIsSyncingDocument,
    data: { page: { __typename: 'Page', isSyncing: false } },
  });
}
