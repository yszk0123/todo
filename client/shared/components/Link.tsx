import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink } from 'rebass';

import { stopPropagation } from '../view_helpers/stopPropagation';

export const Link: React.FunctionComponent<{
  as: string;
  href: string;
}> = ({ as, children, href }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink onClick={stopPropagation}>{children}</RebassLink>
    </NextLink>
  );
};
