import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormSelectField } from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
];

const getDisplayName = (status: TodoStatus) => status;
const getValue = (status: TodoStatus) => status;

export function TodoSearchFormStatusField({
  onSelectStatus,
  status,
}: {
  onSelectStatus: (status: TodoStatus | null) => void;
  status: TodoStatus | null;
}): JSX.Element {
  return (
    <EditFormSelectField
      getDisplayName={getDisplayName}
      getValue={getValue}
      items={statuses}
      rightElement={!status ? <Badge text="preserved" /> : null}
      selectedItem={status}
      onChange={onSelectStatus}
    />
  );
}
