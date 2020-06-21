import React from 'react';
import Link from 'next/link';
import { useRecoilValueOr } from '../lib/hooks/useRecoilValueOr';
import { userQuery } from '../lib/values/userQuery';

const Hello: React.FunctionComponent<{}> = () => {
  const user = useRecoilValueOr(userQuery);
  if (!user) {
    return null;
  }

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
