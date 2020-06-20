import { GraphQLClient } from 'graphql-request';
import { selector } from 'recoil';
import { getSdk } from '../graphql/sdk';

export const sdkDependency = selector({
  key: 'sdkDependency',
  get() {
    const client = new GraphQLClient('/api/graphql', {});
    const sdk = getSdk(client);
    return sdk;
  },
});
