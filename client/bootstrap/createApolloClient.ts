import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { CachePersistor } from 'apollo-cache-persist';

import introspectionResult from '../shared/graphql/__generated__/introspectionResult';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../shared/graphql/__generated__/Page.graphql';
import { isSSR } from '../shared/helpers/isSSR';

const PERSITENCE_DEBOUNCE = 3000;

export function createApolloClient(): {
  initialize: (callback: (client: ApolloClient<unknown>) => void) => void;
} {
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

  const initialize = ssr
    ? (callback: (client: ApolloClient<unknown>) => void) => callback(client)
    : async (callback: (client: ApolloClient<unknown>) => void) => {
        const cachePersistor = new CachePersistor({
          cache,
          debounce: PERSITENCE_DEBOUNCE,

          // @ts-ignore
          storage: window.localStorage,
        });

        await cachePersistor.restore();

        client.onResetStore(async () => {
          initializeCache(cache);
        });

        callback(client);

        // Clear old cache
        cache.reset();
      };

  return { initialize };
}

function initializeCache(cache: InMemoryCache) {
  cache.writeQuery<PageIsSyncingQuery>({
    query: PageIsSyncingDocument,
    data: { page: { __typename: 'Page', isSyncing: false } },
  });
}
