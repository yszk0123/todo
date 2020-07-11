import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormRadioField } from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
];

export function TodoSearchFormStatusField({
  onSelectStatus,
  status,
}: {
  onSelectStatus: (status: TodoStatus) => void;
  status: TodoStatus | null;
}): JSX.Element {
  return (
    <EditFormRadioField
      items={statuses}
      rightElement={!status ? <Badge text="preserved" /> : null}
      selectedItem={status}
      onClick={onSelectStatus}
    />
  );
}
