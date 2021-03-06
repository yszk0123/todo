import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { Link as RebassLink, Text } from 'rebass';

export const NavigationLink: React.FunctionComponent<{
  as?: string;
  href: string;
  prefetch?: boolean;
  text: string;
}> = ({ as, href, prefetch, text }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <NextLink as={as} href={href} passHref prefetch={prefetch}>
      <RebassLink
        bg={isActive ? 'white' : undefined}
        color={isActive ? 'black' : undefined}
        pr={1}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
        }}
        variant="nav"
      >
        <Text>{text}</Text>
      </RebassLink>
    </NextLink>
  );
};
