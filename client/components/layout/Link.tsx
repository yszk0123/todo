import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink } from 'rebass';

import { stopPropagation } from '../../handlers/stopPropagation';

export const Link: React.FunctionComponent<{
  href: string;
  as: string;
  text: string;
}> = ({ href, as, text }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink onClick={stopPropagation}>{text}</RebassLink>
    </NextLink>
  );
};
