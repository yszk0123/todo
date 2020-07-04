import React from 'react';
import { Flex } from 'rebass';
import { LoadingIndicator } from './LoadingIndicator';
import { Navigation } from './Navigation';

export const Page: React.FunctionComponent<{
  isLoading: boolean;
  hasSession: boolean;
  username: string | null;
  avatarUrl: string | null;
  content: React.ReactNode;
}> = ({ isLoading, hasSession, username, avatarUrl, content }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Flex minHeight="100vh" flexDirection="column">
      <Navigation
        hasSession={hasSession}
        username={username}
        avatarUrl={avatarUrl}
      />
      {hasSession && <Flex flexGrow={1}>{content}</Flex>}
    </Flex>
  );
};
