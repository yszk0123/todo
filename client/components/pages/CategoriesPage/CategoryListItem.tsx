import React from 'react';

import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ListItem } from '../../layout/List';
import { GoToTodoLink } from './GoToTodoLink';

export const CategoryListItem: React.FunctionComponent<{
  isActive: boolean;
  category: RootCategoryFragment;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ isActive, category, onClick }) => {
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
