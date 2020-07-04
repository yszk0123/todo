import React from 'react';
import { Flex } from 'rebass';
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
  const avatarUrl = data?.me?.avatarUrl ?? null;

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Navigation
        hasSession={hasSession}
        username={username}
        avatarUrl={avatarUrl}
      />
      {hasSession && <Flex flexGrow={1}>{children}</Flex>}
    </Flex>
  );
};
