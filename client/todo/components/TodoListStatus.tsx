import React from 'react';

import { ListIcon } from '../../shared/components/List';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { TodoStatusDoneIcon } from './TodoStatusDoneIcon';
import { TodoStatusInProgressIcon } from './TodoStatusInProgressIcon';
import { TodoStatusTodoIcon } from './TodoStatusTodoIcon';
import { TodoStatusWaitingIcon } from './TodoStatusWaitingIcon';

const Status: React.FunctionComponent<{ status: TodoStatus }> = ({
  status,
}) => {
  switch (status) {
    case TodoStatus.Todo:
      return <TodoStatusTodoIcon />;
    case TodoStatus.InProgress:
      return <TodoStatusInProgressIcon />;
    case TodoStatus.Waiting:
      return <TodoStatusWaitingIcon />;
    case TodoStatus.Done:
      return <TodoStatusDoneIcon />;
  }
};

export const TodoListStatusIcon: React.FunctionComponent<{
  onClick: () => void;
  status: TodoStatus;
}> = ({ onClick, status }) => {
  return <ListIcon icon={<Status status={status} />} onClick={onClick} />;
};
