import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { Badge } from '../../../shared/components/Badge';
import { EditFormSelectField } from '../../../shared/components/EditForm';
import { getDisplayNameFromCategory } from './getDisplayNameFromCategory';
import { getValueFromCategory } from './getValueFromCategory';

export function TodoSearchFormCategoryField({
  categories,
  category,
  onSelectCategory,
}: {
  categories: RootCategoryFragment[];
  category: RootCategoryFragment | null;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
}): JSX.Element {
  return (
    <EditFormSelectField
      getDisplayName={getDisplayNameFromCategory}
      getValue={getValueFromCategory}
      items={categories}
      label="Category"
      rightElement={!category ? <Badge text="preserved" /> : null}
      selectedItem={category}
      onChange={onSelectCategory}
    />
  );
}
