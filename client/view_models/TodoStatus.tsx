import React from 'react';

import { TodoStatus } from '../shared/graphql/__generated__/baseTypes';
import {
  TodoStatusDoneIcon,
  TodoStatusInProgressIcon,
  TodoStatusTodoIcon,
  TodoStatusWaitingIcon,
} from '../todo/components/TodoStatusIcon';

const iconMap = {
  [TodoStatus.Todo]: TodoStatusTodoIcon,
  [TodoStatus.InProgress]: TodoStatusInProgressIcon,
  [TodoStatus.Done]: TodoStatusDoneIcon,
  [TodoStatus.Waiting]: TodoStatusWaitingIcon,
};

export const getDisplayIconFromTodoStatus = (
  status: TodoStatus
): React.ElementType => iconMap[status];

export function printTodoStatus(status: TodoStatus) {
  switch (status) {
    case TodoStatus.Todo:
      return ' ';
    case TodoStatus.InProgress:
      return '>';
    case TodoStatus.Waiting:
      return '-';
    case TodoStatus.Done:
      return 'x';
  }
}
