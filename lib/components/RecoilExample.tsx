import React from 'react';
import { useRecoilValueOr } from '../hooks/useRecoilValueOr';
import { userQuery } from '../values/userQuery';

export const RecoilExample: React.FunctionComponent<{}> = () => {
  const user = useRecoilValueOr(userQuery);
  return user ? <div>Hello, {user.name}!</div> : null;
};
