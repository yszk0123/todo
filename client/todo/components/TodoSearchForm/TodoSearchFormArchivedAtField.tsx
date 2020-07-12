import React from 'react';

import { EditFormDateTimeInputField } from '../../../shared/components/EditForm';
import { DateTime } from '../../../viewModels/DateTime';

type Props = {
  onChange: (value: DateTime | null) => void;
  value: DateTime | null;
};

export function TodoSearchFormArchivedAtField({ onChange, value }: Props) {
  return <EditFormDateTimeInputField value={value} onChange={onChange} />;
}
