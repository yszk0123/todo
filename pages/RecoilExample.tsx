import React from 'react';
import { GraphQLClient } from 'graphql-request';
import { selector } from 'recoil';
import { getSdk } from './_graphql/request';
import { useRecoilValue } from 'recoil';

const sdkDependency = selector({
  key: 'sdkDependency',
  get() {
    const client = new GraphQLClient('/api/graphql', {});
    const sdk = getSdk(client);
    return sdk;
  },
});

const userQuery = selector<{ name: string } | null>({
  key: 'userQuery',
  async get({ get }) {
    const sdk = get(sdkDependency);
    const data = await sdk.example();
    return data.me ?? null;
  },
});

const RecoilExample: React.FunctionComponent<{}> = () => {
  const user = useRecoilValue(userQuery);

  return user ? <div>Hello, {user.name}!</div> : null;
};

export default RecoilExample;
