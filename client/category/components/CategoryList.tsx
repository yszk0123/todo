import React from 'react';

import { List } from '../../shared/components/List';
import { ID } from '../../view_models/ID';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { CategoryListItem } from './CategoryListItem';

export const CategoryList: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  currentCategoryId: ID | null;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ categories, currentCategoryId, onClick }) => {
  const isSelectMode = currentCategoryId !== null;

  return (
    <List>
      {categories.map((category) => {
        return (
          <CategoryListItem
            category={category}
            isSelected={category.id === currentCategoryId}
            isSelectMode={isSelectMode}
            key={category.id}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
