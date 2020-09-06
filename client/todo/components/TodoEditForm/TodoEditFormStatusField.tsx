import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormIconSelectField } from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { getDisplayIconFromTodoStatus } from '../../../view_models/TodoStatus';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
  TodoStatus.Comment,
];

const getValue = (status: TodoStatus) => status;

export function TodoEditFormStatusField({
  onSelectStatus,
  status,
}: {
  onSelectStatus: (status: TodoStatus | null) => void;
  status: TodoStatus | null;
}): JSX.Element {
  return (
    <EditFormIconSelectField
      getDisplayIcon={getDisplayIconFromTodoStatus}
      getValue={getValue}
      id="todo-edit-status"
      items={statuses}
      label="Status"
      rightElement={!status ? <Badge text="preserved" /> : null}
      selectedItem={status}
      onChange={onSelectStatus}
    />
  );
}
