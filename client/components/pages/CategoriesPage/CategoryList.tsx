import React from 'react';
import { Box } from 'rebass';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { CategoryListItem } from './CategoryListItem';
import { ID } from '../../../viewModels/ID';

export const CategoryList: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  currentCategoryId: ID | null;
  onClick: (category: RootCategoryFragment) => void;
}> = ({ categories, currentCategoryId, onClick }) => {
  return (
    <Box onClick={stopPropagation}>
      {categories.map((category) => {
        return (
          <CategoryListItem
            key={category.id}
            category={category}
            isActive={category.id === currentCategoryId}
            onClick={onClick}
          />
        );
      })}
    </Box>
  );
};
