import React from 'react';

import { Link } from '../../shared/components/Link';
import { ID } from '../../view_models/ID';

export const GoToReportLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <Link
      as={`/categories/${categoryId}/todos/report`}
      href="/categories/[categoryId]/todos/report"
      text="See report"
    />
  );
};
