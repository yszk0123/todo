import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { isSSR } from '../components/helpers/isSSR';
import introspectionResult from '../graphql/__generated__/introspectionResult';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../graphql/__generated__/Page.graphql';

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

  cache.writeQuery<PageIsSyncingQuery>({
    query: PageIsSyncingDocument,
    data: { page: { __typename: 'Page', isSyncing: false } },
  });

  return client;
}
