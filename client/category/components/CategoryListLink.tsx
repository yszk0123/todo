import React from 'react';

import { ListIconLink } from '../../shared/components/List';
import { fromTodoSearchFormValues } from '../../todo/view_models/TodoSearchQuery';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';

type Props = {
  category: RootCategoryFragment;
};

export const CategoryListLink: React.FunctionComponent<Props> = ({
  category,
}) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ category }),
    [category]
  );

  return (
    <ListIconLink
      href={{ pathname: '/todos', query: todoSearchQuery }}
      label="Go to todo"
    />
  );
};
