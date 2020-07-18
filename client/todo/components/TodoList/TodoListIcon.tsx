import React from 'react';

import { ListIconCheckbox } from '../../../shared/components/List';
import { RootTodoFragment } from '../../graphql/__generated__/Todo.graphql';
import { getTodoStatusIcon } from '../TodoStatusIcon';

type Props = {
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (todo: RootTodoFragment) => void;
  todo: RootTodoFragment;
};

export const TodoListIcon: React.FunctionComponent<Props> = ({
  isSelectMode,
  isSelected,
  onClick,
  todo,
}) => {
  return (
    <ListIconCheckbox
      icon={isSelectMode ? null : getTodoStatusIcon(todo.status)}
      isSelected={isSelected}
      item={todo}
      label={todo.status}
      onClick={onClick}
    />
  );
};
