import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { getSdk } from './_graphql/request';

const GraphQLRequestExample: React.FunctionComponent<{}> = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    async function fetch() {
      const client = new GraphQLClient('/api/graphql', {});
      const sdk = getSdk(client);
      const data = await sdk.example();
      setUser(data.me ?? null);
    }
    fetch();
  }, []);

  return user ? <div>Hello, {user.name}!</div> : null;
};

export default GraphQLRequestExample;
