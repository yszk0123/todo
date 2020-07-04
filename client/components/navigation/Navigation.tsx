import React from 'react';
import NextLink from 'next/link';
import { Link, Flex, Text, Box } from 'rebass';
import { Avatar } from './Avatar';

export const Navigation: React.FunctionComponent<{
  hasSession: boolean;
  username: string | null;
  avatarUrl: string | null;
}> = ({ hasSession, username, avatarUrl }) => {
  return (
    <Flex px={2} color="white" bg="black" alignItems="center">
      <NextLink href="/" passHref>
        <Link variant="nav">
          <Text p={2} fontWeight="bold">
            Todo
          </Text>
        </Link>
      </NextLink>
      <Box>
        <NextLink href="/categories" passHref>
          <Link variant="nav">Categories</Link>
        </NextLink>
        <NextLink href="/tags" passHref>
          <Link variant="nav">Tags</Link>
        </NextLink>
      </Box>
      <Box mx="auto" />
      {username && <Text p={2}>{username}</Text>}
      {avatarUrl && <Avatar url={avatarUrl} alt={username || 'avatar'} />}
      <Box p={2}>
        {hasSession ? (
          <NextLink href="/api/auth/signout" passHref>
            <Link variant="nav">Sign out</Link>
          </NextLink>
        ) : (
          <NextLink href="/api/auth/signin" passHref>
            <Link variant="nav">Sign in</Link>
          </NextLink>
        )}
      </Box>
    </Flex>
  );
};
