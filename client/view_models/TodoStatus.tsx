import React from 'react';

import { TodoStatus } from '../shared/graphql/__generated__/baseTypes';
import {
  TodoStatusDoneIcon,
  TodoStatusInProgressIcon,
  TodoStatusTodoIcon,
  TodoStatusWaitingIcon,
} from '../todo/components/TodoStatusIcon';
import { TodoStatusCommentIcon } from '../todo/components/TodoStatusIcon/TodoStatusCommentIcon';

const iconMap = {
  [TodoStatus.Todo]: TodoStatusTodoIcon,
  [TodoStatus.InProgress]: TodoStatusInProgressIcon,
  [TodoStatus.Done]: TodoStatusDoneIcon,
  [TodoStatus.Waiting]: TodoStatusWaitingIcon,
  [TodoStatus.Comment]: TodoStatusCommentIcon,
};

export const getDisplayIconFromTodoStatus = (
  status: TodoStatus
): React.ElementType => iconMap[status];

export function printTodoStatus(status: TodoStatus): string {
  switch (status) {
    case TodoStatus.Todo:
      return ' ';
    case TodoStatus.InProgress:
      return '-';
    case TodoStatus.Waiting:
      return '#';
    case TodoStatus.Done:
      return 'x';
    case TodoStatus.Comment:
      return '>';
  }
}
