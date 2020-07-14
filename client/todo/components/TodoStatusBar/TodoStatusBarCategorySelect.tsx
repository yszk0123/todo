import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { Select } from '../../../shared/components/Select';

const getDisplayName = (category: RootCategoryFragment) => category.name;
const getValue = (category: RootCategoryFragment) => category.id;

export const TodoStatusBarCategorySelect: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  onClickCategory: (category: RootCategoryFragment | null) => void;
}> = ({ categories, category, onClickCategory }) => {
  return (
    <Select
      getDisplayName={getDisplayName}
      getValue={getValue}
      items={categories}
      selectedItem={category}
      onChange={onClickCategory}
    />
  );
};
