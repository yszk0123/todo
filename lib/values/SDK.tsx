import { GraphQLClient } from 'graphql-request';
import { getSdk, Sdk } from '../graphql/sdk';

export type SDK = Sdk;

export function createSDK() {
  const client = new GraphQLClient('/api/graphql', {});
  const sdk = getSdk(client);
  return sdk;
}
