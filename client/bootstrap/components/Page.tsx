import React from 'react';
import { Flex } from 'rebass';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { Navigation } from '../../shared/components/Navigation';

export const Page: React.FunctionComponent<{
  avatarUrl: string | null;
  content: React.ReactNode;
  hasSession: boolean;
  isLoading: boolean;
  username: string | null;
}> = ({ avatarUrl, content, hasSession, isLoading, username }) => {
  if (isLoading) {
    return (
      <Flex flexDirection="column" minHeight="100vh">
        <Flex flexGrow={1}>
          <LoadingIndicator />
        </Flex>
      </Flex>
    );
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
