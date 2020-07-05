import React from 'react';

import { TodoStatus } from '../../../../graphql/__generated__/baseTypes';
import { Badge } from '../../../layout/Badge';
import { EditFormRadioField } from '../../../layout/EditForm';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
];

export function TodoEditFormStatusField({
  status,
  onSelectStatus,
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
