import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import introspectionResult from '../graphql/__generated__/introspectionResult';
import { isSSR } from '../components/helpers/isSSR';

export function createApolloClient() {
  const ssr = isSSR();

  const client = new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: introspectionResult.__schema,
    }),
    link: new HttpLink({
      uri: '/api/graphql',
    }),
    ssrMode: ssr,
  });
  return client;
}
