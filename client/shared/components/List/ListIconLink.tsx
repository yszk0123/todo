import React from 'react';
import { Flex } from 'rebass';

import { URL } from '../../view_models/URL';
import { Link } from '../Link';
import { LinkToIcon } from './LinkToIcon';

type Props = {
  as?: string;
  href: URL;
};

export function ListIconLink({ as, href }: Props): JSX.Element {
  return (
    <Link as={as} href={href}>
      <Flex p={1}>
        <LinkToIcon />
      </Flex>
    </Link>
  );
}
