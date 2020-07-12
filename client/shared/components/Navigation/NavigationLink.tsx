import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink, Text } from 'rebass';

export const NavigationLink: React.FunctionComponent<{
  as?: string;
  href: string;
  prefetch?: boolean;
  text: string;
}> = ({ as, href, prefetch, text }) => {
  return (
    <NextLink as={as} href={href} passHref prefetch={prefetch}>
      <RebassLink
        mr={1}
        sx={{ flexGrow: 1, textAlign: 'center' }}
        variant="nav"
      >
        <Text fontWeight="bold">{text}</Text>
      </RebassLink>
    </NextLink>
  );
};
