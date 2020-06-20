import React from 'react';
import { RecoilExample } from '../lib/components/RecoilExample';

const HomePage: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <div>Hello, world!</div>
      <RecoilExample />
    </div>
  );
};

export default HomePage;
