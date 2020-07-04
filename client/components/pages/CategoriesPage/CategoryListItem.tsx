import React from 'react';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ID } from '../../../viewModels/ID';
import { ListItem } from '../../layout/List';
import { Link } from '../../layout/Link';

const GoToTodoLink: React.FunctionComponent<{
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

export const CategoryListItem: React.FunctionComponent<{
  isActive: boolean;
  category: RootCategoryFragment;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ isActive, category, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={category}
      onClick={onClick}
      leftElement={<GoToTodoLink categoryId={category.id} />}
      mainElement={category.name}
    />
  );
};
