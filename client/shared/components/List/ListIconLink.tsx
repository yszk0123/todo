import React from 'react';

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
      <LinkToIcon />
    </Link>
  );
}
