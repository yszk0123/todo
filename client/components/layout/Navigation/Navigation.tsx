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
      alignItems="center"
      bg="black"
      color="white"
      height={48}
      px={2}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        boxShadow: 1,
      }}
    >
      <NavigationLink href="/" text="Todo" />
      <Flex overflowX="auto">
        <Flex flexShrink={0}>
          <NavigationLink href="/categories" text="Categories" />
          <NavigationLink href="/tags" text="Tags" />
          <NavigationLink href="/checkpoints" text="Checkpoints" />
        </Flex>
      </Flex>
      <Box mx="auto" />
      {username && <Text p={2}>{username}</Text>}
      {avatarUrl && <Avatar alt={username || 'avatar'} url={avatarUrl} />}
      <Box p={2}>
        {hasSession ? (
          <NavigationLink href="/api/auth/signout" text="Sign out" />
        ) : (
          <NavigationLink href="/api/auth/signin" text="Sign in" />
        )}
      </Box>
    </Flex>
  );
};
