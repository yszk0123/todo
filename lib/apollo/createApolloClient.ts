import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import introspectionResult from '../graphql/__generated__/introspectionResult';

export function createApolloClient() {
  const client = new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: introspectionResult.__schema,
    }),
    link: new HttpLink({
      uri: '/api/graphql',
    }),
  });
  return client;
}
