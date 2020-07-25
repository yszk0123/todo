import React from 'react';

import { EditFormDateInputField } from '../../../shared/components/EditForm';
import { DateTime } from '../../../view_models/DateTime';

type Props = {
  onChange: (value: DateTime | null) => void;
  value: DateTime | null;
};

export function TodoSearchFormArchivedAtField({ onChange, value }: Props) {
  return (
    <EditFormDateInputField
      id="todo-search-archived-at"
      label="ArchivedAt"
      value={value}
      onChange={onChange}
    />
  );
}
