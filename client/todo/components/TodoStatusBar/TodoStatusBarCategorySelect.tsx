import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { LabelledSelect } from '../../../shared/components/LabelledSelect';

const getDisplayName = (category: RootCategoryFragment, i: number) =>
  `${i}: ${category.name}`;
const getValue = (category: RootCategoryFragment) => category.id;

export const TodoStatusBarCategorySelect: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  onClickCategory: (category: RootCategoryFragment | null) => void;
}> = ({ categories, category, onClickCategory }) => {
  return (
    <LabelledSelect
      getDisplayName={getDisplayName}
      getValue={getValue}
      id="todo-status-category"
      items={categories}
      label="Category"
      selectedItem={category}
      onChange={onClickCategory}
    />
  );
};
