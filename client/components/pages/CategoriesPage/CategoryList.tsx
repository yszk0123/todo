import React from 'react';

import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { CategoryListItem } from './CategoryListItem';

export const CategoryList: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  currentCategoryId: ID | null;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ categories, currentCategoryId, onClick }) => {
  return (
    <List>
      {categories.map((category) => {
        return (
          <CategoryListItem
            category={category}
            isActive={category.id === currentCategoryId}
            key={category.id}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
