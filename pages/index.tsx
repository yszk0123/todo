import React from 'react';
import Link from 'next/link';
import { RecoilExample } from '../lib/components/RecoilExample';

const HomePage: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <div>Hello, world!</div>
      <RecoilExample />
      <Link href="/todos">
        <a>Todos</a>
      </Link>
    </div>
  );
};

export default HomePage;
