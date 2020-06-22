import React from 'react';
import { useSession } from 'next-auth/client';
import NextLink from 'next/link';
import { Link, Flex, Text, Box } from 'rebass';
import { useIndexPageQuery } from '../graphql/__generated__/IndexPage.graphql';
import { Loading } from './Lodaing';

export const Gate: React.FunctionComponent<{}> = ({ children }) => {
  const [session, isSessionLoading] = useSession();
  const { loading: isQueryLoading, data } = useIndexPageQuery();
  const hasSession = !!session;
  const isLoading = isSessionLoading || isQueryLoading;

  if (isLoading || isSessionLoading) {
    return <Loading />;
  }

  const username = data?.me?.name ?? null;

  return (
    <div>
      <Flex px={2} color="white" bg="black" alignItems="center">
        <NextLink href="/">
          <Link variant="nav" href="/">
            <Text p={2} fontWeight="bold">
              Todo
            </Text>
          </Link>
        </NextLink>
        <Box>
          <NextLink href="/">
            <Link variant="nav" href="/">
              Home
            </Link>
          </NextLink>
          <NextLink href="/todos">
            <Link variant="nav" href="/todos">
              Todos
            </Link>
          </NextLink>
        </Box>
        <Box mx="auto" />
        {username && <Text p={2}>{username}</Text>}
        <Box p={2}>
          {hasSession ? (
            <NextLink href="/api/auth/signout">
              <Link variant="nav" href="/api/auth/signout">
                Sign out
              </Link>
            </NextLink>
          ) : (
            <NextLink href="/api/auth/signin">
              <Link variant="nav" href="/api/auth/signin">
                Sign in
              </Link>
            </NextLink>
          )}
        </Box>
      </Flex>
      {hasSession && children}
    </div>
  );
};