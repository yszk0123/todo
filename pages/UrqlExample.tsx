import React from 'react';
import { useExampleQuery } from './_graphql/urql';

const UrqlExample: React.FunctionComponent<{}> = () => {
  const [userResult] = useExampleQuery();
  if (!userResult.data?.me) {
    return null;
  }
  const me = userResult.data.me;
  return <div>Hello, {me.name}!</div>;
};

export default UrqlExample;
