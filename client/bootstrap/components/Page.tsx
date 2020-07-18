import React from 'react';
import { Flex } from 'rebass';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { Navigation } from '../../shared/components/Navigation';
import { FOOTER_ID } from '../../shared/constants/FOOTER_ID';
import { EmptyProps } from '../../view_models/EmptyProps';

const Wrapper: React.FunctionComponent<EmptyProps> = ({ children }) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      {children}
    </Flex>
  );
};

export const Page: React.FunctionComponent<{
  avatarUrl: string | null;
  content: React.ReactNode;
  hasSession: boolean;
  isLoading: boolean;
  username: string | null;
}> = ({ avatarUrl, content, hasSession, isLoading, username }) => {
  return (
    <Wrapper>
      <Navigation
        avatarUrl={avatarUrl}
        hasSession={hasSession}
        username={username}
      />
      <Flex as="main" flexGrow={1} role="main">
        {isLoading ? <LoadingIndicator /> : hasSession && content}
      </Flex>
      <Flex
        as="footer"
        id={FOOTER_ID}
        sx={{
          position: 'sticky',
          zIndex: 2,
          bottom: 0,
          boxShadow: 2,
        }}
      />
    </Wrapper>
  );
};
