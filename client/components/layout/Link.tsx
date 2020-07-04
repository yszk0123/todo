import React from 'react';
import NextLink from 'next/link';
import { Link as RebassLink } from 'rebass';

export const Link: React.FunctionComponent<{
  href: string;
  as: string;
  text: string;
}> = ({ href, as, text }) => {
  return (
    <NextLink href={href} as={as} passHref>
      <RebassLink>{text}</RebassLink>
    </NextLink>
  );
};
