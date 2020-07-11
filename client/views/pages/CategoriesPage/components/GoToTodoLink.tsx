import React from 'react';

import { ID } from '../../../viewModels/ID';
import { Link } from '../../components/Link';

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
