import React from 'react';
import Link from 'next/link';
import { useIndexPageQuery } from '../lib/graphql/__generated__/IndexPage.graphql';

const Hello: React.FunctionComponent<{}> = () => {
  const { loading, data } = useIndexPageQuery();
  if (loading || !data?.me) {
    return null;
  }

  const user = data.me;

  return (
    <div>
      Hello, {user.id} {user.name}!
    </div>
  );
};

const HomePage: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <Hello />
      <Link href="/todos">
        <a>Todos</a>
      </Link>
    </div>
  );
};

export default HomePage;
