import React from 'react';

import { IconSelect } from '../../../shared/components/IconSelect';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import {
  TodoStatusDoneIcon,
  TodoStatusInProgressIcon,
  TodoStatusTodoIcon,
  TodoStatusWaitingIcon,
} from '../TodoStatusIcon';

const iconMap = {
  [TodoStatus.Todo]: <TodoStatusTodoIcon />,
  [TodoStatus.InProgress]: <TodoStatusInProgressIcon />,
  [TodoStatus.Done]: <TodoStatusDoneIcon />,
  [TodoStatus.Waiting]: <TodoStatusWaitingIcon />,
};

const getDisplayIcon = (status: TodoStatus) => iconMap[status];
const getValue = (status: TodoStatus) => status;

const STATUSES: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Done,
  TodoStatus.Waiting,
];

export const TodoStatusBarStatusSelect: React.FunctionComponent<{
  onChange: (status: TodoStatus) => void;
  status: TodoStatus | null;
}> = ({ onChange, status }) => {
  return (
    <IconSelect
      getDisplayIcon={getDisplayIcon}
      getValue={getValue}
      items={STATUSES}
      selectedItem={status}
      onChange={onChange}
    />
  );
};
