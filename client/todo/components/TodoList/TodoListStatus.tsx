import React from 'react';

import { ListIcon } from '../../../shared/components/List';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { TodoStatusIcon } from '../TodoStatusIcon';

export const TodoListStatusIcon: React.FunctionComponent<{
  onClick: () => void;
  status: TodoStatus;
}> = ({ onClick, status }) => {
  return (
    <ListIcon icon={<TodoStatusIcon status={status} />} onClick={onClick} />
  );
};
