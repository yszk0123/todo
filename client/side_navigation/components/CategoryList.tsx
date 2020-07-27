import React from 'react';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { List } from '../../shared/components/List';
import { CategoryListItem } from './CategoryListItem';

export const CategoryList: React.FunctionComponent<{
  categories: RootCategoryFragment[];
}> = ({ categories }) => {
  return (
    <List>
      {categories.map((category) => {
        return <CategoryListItem category={category} key={category.id} />;
      })}
    </List>
  );
};
