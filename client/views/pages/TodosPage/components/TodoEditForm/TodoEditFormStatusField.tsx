import React from 'react';

import { TodoStatus } from '../../../../../graphql/__generated__/baseTypes';
import { Badge } from '../../../../components/Badge';
import { EditFormRadioField } from '../../../../components/EditForm';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
];

export function TodoEditFormStatusField({
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
