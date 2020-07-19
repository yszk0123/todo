import React from 'react';
import { Flex } from 'rebass';

import { Link } from '../Link';

export const StatusBarLink: React.FunctionComponent<{
  as: string;
  href: string;
  text: string;
}> = ({ as, href, text }) => {
  return (
    <Flex alignItems="center" mr={2}>
      <Link as={as} href={href}>
        {text}
      </Link>
    </Flex>
  );
};
