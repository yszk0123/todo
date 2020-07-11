import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink } from 'rebass';

import { stopPropagation } from '../helpers/stopPropagation';

export const Link: React.FunctionComponent<{
  as: string;
  href: string;
  text: string;
}> = ({ as, href, text }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink onClick={stopPropagation}>{text}</RebassLink>
    </NextLink>
  );
};
