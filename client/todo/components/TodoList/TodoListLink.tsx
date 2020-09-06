import React from 'react';

import { ListIconLink } from '../../../shared/components/List';
import { RootTodoFragment } from '../../graphql/__generated__/Todo.graphql';
import {
  fromTodoSearchFormValues,
  TodoSearchQuery,
} from '../../view_models/TodoSearchQuery';

type Props = {
  query: TodoSearchQuery;
  todo: RootTodoFragment;
};

export const TodoListLink: React.FunctionComponent<Props> = ({
  query,
  todo,
}) => {
  const todoSearchQuery = React.useMemo(
    () => fromTodoSearchFormValues({ parentId: todo.id }, query),
    [todo, query]
  );

  return (
    <ListIconLink
      href={{ pathname: '/todos', query: todoSearchQuery }}
      label="Go to todo"
    />
  );
};
