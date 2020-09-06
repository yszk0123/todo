import React from 'react';

import { ListIconLink } from '../../../shared/components/List';
import { RootTodoFragment } from '../../graphql/__generated__/Todo.graphql';
import { fromTodoSearchFormValues } from '../../view_models/TodoSearchQuery';

type Props = {
  todo: RootTodoFragment;
};

export const TodoListLink: React.FunctionComponent<Props> = ({ todo }) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ parentId: todo.id }),
    [todo]
  );

  return (
    <ListIconLink
      href={{ pathname: '/todos', query: todoSearchQuery }}
      label="Go to todo"
    />
  );
};
