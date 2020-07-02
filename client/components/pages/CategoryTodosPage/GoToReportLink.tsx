import React from 'react';
import NextLink from 'next/link';
import { Link } from 'rebass';

export const GoToReportLink: React.FunctionComponent<{
  categoryId: number;
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
