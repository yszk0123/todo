import React, { useEffect, useState } from 'react';
import { GraphQLClient } from 'graphql-request';
import { User } from '@prisma/client';

const Hoge: React.FunctionComponent<{}> = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetch() {
      const client = new GraphQLClient('/api/graphql', {});
      const query = `
        {
          me {
            name
            email
          }
        }
      `;
      const data = await client.request<{ me: User }>(query);
      setUser(data.me);
    }
    fetch();
  }, []);

  return user ? <div>Hello, {user.name}!</div> : null;
};

export default Hoge;
