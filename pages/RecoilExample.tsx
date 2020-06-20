import React from 'react';
import { useRecoilValueOr } from './_lib/hooks/useRecoilValueOr';
import { userQuery } from './_lib/values/userQuery';

export const RecoilExample: React.FunctionComponent<{}> = () => {
  const user = useRecoilValueOr(userQuery);
  return user ? <div>Hello, {user.name}!</div> : null;
};
