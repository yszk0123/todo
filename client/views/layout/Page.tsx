import React from 'react';
import { Flex } from 'rebass';

import { LoadingIndicator } from './LoadingIndicator';
import { Navigation } from './Navigation';

export const Page: React.FunctionComponent<{
  avatarUrl: string | null;
  content: React.ReactNode;
  hasSession: boolean;
  isLoading: boolean;
  username: string | null;
}> = ({ avatarUrl, content, hasSession, isLoading, username }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Navigation
        avatarUrl={avatarUrl}
        hasSession={hasSession}
        username={username}
      />
      {hasSession && <Flex flexGrow={1}>{content}</Flex>}
    </Flex>
  );
};
