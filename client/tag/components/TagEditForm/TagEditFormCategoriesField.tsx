import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { Badge } from '../../../shared/components/Badge';
import { EditFormBadgeSelectField } from '../../../shared/components/EditForm';
import { EMPTY } from '../../../shared/constants/EMPTY';
import { Color } from '../../../view_models/Color';

const getColor = () => Color.Default;
const getValue = (category: RootCategoryFragment) => category.id;
const getBadgeDisplayName = (category: RootCategoryFragment) => category.name;
const getSelectDisplayName = (category: RootCategoryFragment, i: number) =>
  `${i + 1}. ${category.name}`;

export function TagEditFormCategoriesField({
  categories,
  onChange,
  selectedCategories,
}: {
  categories: RootCategoryFragment[];
  onChange: (categories: RootCategoryFragment[]) => void;
  selectedCategories: RootCategoryFragment[] | null;
}): JSX.Element | null {
  if (categories.length === 0) {
    return null;
  }

  return (
    <EditFormBadgeSelectField
      getBadgeDisplayName={getBadgeDisplayName}
      getColor={getColor}
      getSelectDisplayName={getSelectDisplayName}
      getValue={getValue}
      id="tag-edit-categories"
      items={categories}
      label="Categories"
      rightElement={!selectedCategories ? <Badge text="preserved" /> : null}
      selectedItems={selectedCategories ?? EMPTY}
      onChange={onChange}
    />
  );
}
