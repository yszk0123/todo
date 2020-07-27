import React from 'react';
import { Flex } from 'rebass';

import { Navigation } from '../../../shared/components/Navigation';
import { SideNavigationContainer } from '../../../side_navigation';
import { EmptyProps } from '../../../view_models/EmptyProps';
import { FooterPlaceholder } from './FooterPlaceholder';
import { Main } from './Main';
import { SideBarPlaceholder } from './SideBarPlaceholder';

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
      <Flex flexGrow={1}>
        <SideBarPlaceholder />
        <SideNavigationContainer />
        <Main content={content} hasSession={hasSession} isLoading={isLoading} />
      </Flex>
      <FooterPlaceholder />
    </Wrapper>
  );
};
