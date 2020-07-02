import React from 'react';
import { useSession } from 'next-auth/client';
import { useIndexPageQuery } from '../../graphql/__generated__/IndexPage.graphql';
import { LoadingIndicator } from '../atoms/LoadingIndicator';
import { Navigation } from './Navigation';

export const Gate: React.FunctionComponent<{}> = ({ children }) => {
  const [session, isSessionLoading] = useSession();
  const { loading: isQueryLoading, data } = useIndexPageQuery();
  const hasSession = !!session;
  const isLoading = isSessionLoading || isQueryLoading;

  if (isLoading || isSessionLoading) {
    return <LoadingIndicator />;
  }

  const username = data?.me?.name ?? null;

  return (
    <div>
      <Navigation hasSession={hasSession} username={username} />
      {hasSession && children}
    </div>
  );
};
