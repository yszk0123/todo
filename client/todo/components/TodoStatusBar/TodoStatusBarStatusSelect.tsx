import React from 'react';

import { IconSelect } from '../../../shared/components/IconSelect';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { getDisplayIconFromTodoStatus } from '../../../view_models/TodoStatus';

const getValue = (status: TodoStatus) => status;

const STATUSES: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Done,
  TodoStatus.Waiting,
  TodoStatus.Comment,
];

export const TodoStatusBarStatusSelect: React.FunctionComponent<{
  onChange: (status: TodoStatus) => void;
  status: TodoStatus | null;
}> = ({ onChange, status }) => {
  return (
    <IconSelect
      getDisplayIcon={getDisplayIconFromTodoStatus}
      getValue={getValue}
      id="todo-status"
      items={STATUSES}
      selectedItem={status}
      onChange={onChange}
    />
  );
};
