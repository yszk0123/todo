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

const TodoListIcon: React.ForwardRefRenderFunction<unknown, Props> = (
  { isSelectMode, isSelected, onClick, todo },
  ref
) => {
  return (
    <ListIconCheckbox
      icon={isSelectMode ? null : getTodoStatusIcon(todo.status)}
      isSelected={isSelected}
      item={todo}
      label={todo.status}
      ref={ref}
      onClick={onClick}
    />
  );
};

const ForwardedTodoListIcon = React.forwardRef(TodoListIcon);

export { ForwardedTodoListIcon as TodoListIcon };
