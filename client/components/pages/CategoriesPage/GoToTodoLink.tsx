import React from 'react';
import { ID } from '../../../viewModels/ID';
import { Link } from '../../layout/Link';

export const GoToTodoLink: React.FunctionComponent<{
  categoryId: ID;
}> = ({ categoryId }) => {
  return (
    <Link
      href="/categories/[categoryId]/todos"
      as={`/categories/${categoryId}/todos`}
      text="Go"
    />
  );
};
