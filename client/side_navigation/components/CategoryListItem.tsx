import React from 'react';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { Link } from '../../shared/components/Link';
import { ListItem } from '../../shared/components/List';
import { fromTodoSearchFormValues } from '../../todo/view_models/TodoSearchQuery';
import { CategoryListIcon } from './CategoryListIcon';

export const CategoryListItem: React.FunctionComponent<{
  category: RootCategoryFragment;
}> = ({ category }) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ category }),
    [category]
  );

  // FIXME: Expand clickable area
  return (
    <ListItem
      item={category}
      leftElement={<CategoryListIcon />}
      mainElement={
        <Link href={{ pathname: '/todos', query: todoSearchQuery }}>
          {category.name}
        </Link>
      }
    />
  );
};
