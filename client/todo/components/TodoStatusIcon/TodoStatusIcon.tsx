import React from 'react';

import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { TodoStatusDoneIcon } from './TodoStatusDoneIcon';
import { TodoStatusInProgressIcon } from './TodoStatusInProgressIcon';
import { TodoStatusTodoIcon } from './TodoStatusTodoIcon';
import { TodoStatusWaitingIcon } from './TodoStatusWaitingIcon';

export const TodoStatusIcon: React.FunctionComponent<{
  status: TodoStatus;
}> = ({ status }) => {
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
