import React from 'react';
import NextLink from 'next/link';
import { Link } from 'rebass';
import { ID } from '../../../viewModels/ID';

export const GoToReportLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <NextLink
      href="/categories/[categoryId]/todos/report"
      as={`/categories/${categoryId}/todos/report`}
      passHref
    >
      <Link>See report</Link>
    </NextLink>
  );
};
