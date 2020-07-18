import React from 'react';

import { ListItem } from '../../shared/components/List';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { CategoryListIcon } from './CategoryListIcon';

export const CategoryListItem: React.FunctionComponent<{
  category: RootCategoryFragment;
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ category, isSelectMode, isSelected, onClick }) => {
  return (
    <ListItem
      isActive={isSelected}
      item={category}
      leftElement={
        <CategoryListIcon
          category={category}
          isSelected={isSelected}
          isSelectMode={isSelectMode}
          onClick={onClick}
        />
      }
      mainElement={category.name}
      onClick={onClick}
    />
  );
};
