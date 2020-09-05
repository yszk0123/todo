import React from 'react';

import { IconSelect } from '../../../shared/components/IconSelect';
import { Popover } from '../../../shared/components/Popover';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { getDisplayIconFromTodoStatus } from '../../../view_models/TodoStatus';
import { RootTodoFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoListIcon } from './TodoListIcon';

const getValue = (status: TodoStatus) => status;

const STATUSES: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Done,
  TodoStatus.Waiting,
];

type Props = {
  isOpen: boolean;
  isSelectMode: boolean;
  isSelected: boolean;
  onChange: (status: TodoStatus) => void;
  onClick: () => void;
  onClosePopover: () => void;
  todo: RootTodoFragment;
};

export const TodoListStatusSelect: React.FunctionComponent<Props> = ({
  isOpen,
  isSelectMode,
  isSelected,
  onChange,
  onClick,
  onClosePopover,
  todo,
}) => {
  return (
    <Popover
      content={
        <IconSelect
          getDisplayIcon={getDisplayIconFromTodoStatus}
          getValue={getValue}
          id="todo-status"
          items={STATUSES}
          selectedItem={null}
          onChange={onChange}
        />
      }
      isOpen={isOpen}
      position="right"
      onClickOutside={onClosePopover}
    >
      <TodoListIcon
        isSelected={isSelected}
        isSelectMode={isSelectMode}
        todo={todo}
        onClick={onClick}
      />
    </Popover>
  );
};
