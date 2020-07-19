import React from 'react';
import { Flex } from 'rebass';

import { Link } from '../Link';

type Props = {
  as: string;
  href: string;
  icon: JSX.Element;
};

export function ListIconLink({ as, href, icon }: Props): JSX.Element {
  return (
    <Link as={as} href={href}>
      <Flex
        alignItems="center"
        color="gray"
        justifyContent="center"
        sx={{ ':hover': { opacity: 0.7 } }}
      >
        {icon}
      </Flex>
    </Link>
  );
}
