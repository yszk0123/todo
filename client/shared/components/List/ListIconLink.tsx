import React from 'react';
import { Flex } from 'rebass';

import { URL } from '../../view_models/URL';
import { Link } from '../Link';
import { LinkFromIcon } from './LinkFromIcon';
import { LinkToIcon } from './LinkToIcon';

type Props = {
  as?: string;
  href: URL;
  label?: string;
  reverse?: boolean;
};

export function ListIconLink({
  as,
  href,
  label,
  reverse = false,
}: Props): JSX.Element {
  return (
    <Link as={as} href={href} label={label}>
      <Flex p={1}>{reverse ? <LinkFromIcon /> : <LinkToIcon />}</Flex>
    </Link>
  );
}
