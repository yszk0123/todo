import React from 'react';
import NextLink from 'next/link';
import { Link as RebassLink, Text } from 'rebass';

export const NavigationLink: React.FunctionComponent<{
  href: string;
  as?: string;
  text: string;
}> = ({ href, as, text }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink variant="nav">
        <Text fontWeight="bold">{text}</Text>
      </RebassLink>
    </NextLink>
  );
};
