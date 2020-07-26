import React from 'react';
import { Flex } from 'rebass';

import { URL } from '../../view_models/URL';
import { Link } from '../Link';
import { LinkToIcon } from './LinkToIcon';

type Props = {
  as?: string;
  href: URL;
  label?: string;
};

export function ListIconLink({ as, href, label }: Props): JSX.Element {
  return (
    <Link as={as} href={href} label={label}>
      <Flex p={1}>
        <LinkToIcon />
      </Flex>
    </Link>
  );
}
