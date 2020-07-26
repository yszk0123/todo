import NextLink from 'next/link';
import React from 'react';
import { Link as RebassLink } from 'rebass';

import { stopPropagation } from '../view_helpers/stopPropagation';
import { URL } from '../view_models/URL';

export const Link: React.FunctionComponent<{
  as?: string;
  href: URL;
  label?: string;
}> = ({ as, children, href, label }) => {
  return (
    <NextLink as={as} href={href} passHref>
      <RebassLink aria-label={label} onClick={stopPropagation}>
        {children}
      </RebassLink>
    </NextLink>
  );
};
