import React from 'react';
import { Flex, Text, Box } from 'rebass';
import { Avatar } from './Avatar';
import { NavigationLink } from './NavigationLink';

export const Navigation: React.FunctionComponent<{
  hasSession: boolean;
  username: string | null;
  avatarUrl: string | null;
}> = ({ hasSession, username, avatarUrl }) => {
  return (
    <Flex alignItems="center" bg="black" color="white" px={2}>
      <NavigationLink href="/" text="Todo" />
      <Box>
        <NavigationLink href="/categories" text="Categories" />
        <NavigationLink href="/tags" text="Tags" />
      </Box>
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
