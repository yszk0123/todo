import React from 'react';

import { Select } from '../../../shared/components/Select';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';

const getDisplayName = (status: TodoStatus) => status;
const getValue = (status: TodoStatus) => status;

const STATUSES: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Done,
  TodoStatus.Waiting,
];

export const TodoStatusBarStatusSelect: React.FunctionComponent<{
  onChange: (status: TodoStatus | null) => void;
  status: TodoStatus | null;
}> = ({ onChange, status }) => {
  return (
    <Select
      getDisplayName={getDisplayName}
      getValue={getValue}
      items={STATUSES}
      selectedItem={status}
      onChange={onChange}
    />
  );
};
