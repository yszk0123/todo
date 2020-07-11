import React from 'react';

import { RootCategoryFragment } from '../../../graphql/__generated__/Category.graphql';
import { ListItem } from '../../layout/List';
import { GoToTodoLink } from './GoToTodoLink';

export const CategoryListItem: React.FunctionComponent<{
  category: RootCategoryFragment;
  isActive: boolean;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ category, isActive, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={category}
      leftElement={<GoToTodoLink categoryId={category.id} />}
      mainElement={category.name}
      onClick={onClick}
    />
  );
};
