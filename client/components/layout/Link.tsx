import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink } from 'rebass';

export const Link: React.FunctionComponent<{
  href: string;
  as: string;
  text: string;
}> = ({ href, as, text }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink>{text}</RebassLink>
    </NextLink>
  );
};
