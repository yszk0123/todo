import React from 'react';
import { useSession } from 'next-auth/client';
import NextLink from 'next/link';
import { Link, Flex, Text, Box } from 'rebass';
import { useIndexPageQuery } from '../../graphql/__generated__/IndexPage.graphql';
import { LoadingIndicator } from '../LodaingIndicator';

export const Gate: React.FunctionComponent<{}> = ({ children }) => {
  const [session, isSessionLoading] = useSession();
  const { loading: isQueryLoading, data } = useIndexPageQuery();
  const hasSession = !!session;
  const isLoading = isSessionLoading || isQueryLoading;

  if (isLoading || isSessionLoading) {
    return <LoadingIndicator />;
  }

  const username = data?.me?.name ?? null;

  return (
    <div>
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
      {hasSession && children}
    </div>
  );
};
