import React from 'react';
import { Box, Flex, Text } from 'rebass';

import { Avatar } from './Avatar';
import { NavigationLink } from './NavigationLink';

export const Navigation: React.FunctionComponent<{
  avatarUrl: string | null;
  hasSession: boolean;
  username: string | null;
}> = ({ avatarUrl, hasSession, username }) => {
  return (
    <Flex
      as="header"
      bg="black"
      role="banner"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: 1,
      }}
    >
      <Flex
        alignItems="center"
        as="nav"
        bg="black"
        color="white"
        flexDirection="column"
        role="navigation"
        width="100%"
      >
        <Flex alignItems="center" bg="black" color="white" px={2} width={1}>
          <Flex as="h1">
            <NavigationLink href="/" text="Todo" />
          </Flex>
          <Box mx="auto" />
          {username && <Text p={2}>{username}</Text>}
          {avatarUrl && <Avatar alt={username || 'avatar'} url={avatarUrl} />}
          <Flex>
            {hasSession ? (
              <NavigationLink
                href="/api/auth/signout"
                prefetch={false}
                text="Sign out"
              />
            ) : (
              <NavigationLink
                href="/api/auth/signin"
                prefetch={false}
                text="Sign in"
              />
            )}
          </Flex>
        </Flex>
        <Flex
          alignItems="center"
          bg="gray"
          color="white"
          justifyContent="space-between"
          width={1}
        >
          <NavigationLink href="/categories" text="Category" />
          <NavigationLink href="/checkpoints" text="Checkpoint" />
          <NavigationLink href="/todos" text="Todo" />
          <NavigationLink href="/tags" text="Tag" />
        </Flex>
      </Flex>
    </Flex>
  );
};
