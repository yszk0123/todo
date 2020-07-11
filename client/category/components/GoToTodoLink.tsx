import React from 'react';

import { Link } from '../../shared/components/Link';
import { ID } from '../../viewModels/ID';

export const GoToTodoLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <Link
      as={`/categories/${categoryId}/todos`}
      href="/categories/[categoryId]/todos"
      text="Go"
    />
  );
};
