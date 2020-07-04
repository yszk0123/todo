import React from 'react';
import { ID } from '../../../viewModels/ID';
import { Link } from '../../layout/Link';

export const GoToReportLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <Link
      href="/categories/[categoryId]/todos/report"
      as={`/categories/${categoryId}/todos/report`}
      text="See report"
    />
  );
};
