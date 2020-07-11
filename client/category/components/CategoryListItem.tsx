import React from 'react';

import { ListItem } from '../../shared/components/List';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';

export const CategoryListItem: React.FunctionComponent<{
  category: RootCategoryFragment;
  isActive: boolean;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ category, isActive, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={category}
      mainElement={category.name}
      onClick={onClick}
    />
  );
};
