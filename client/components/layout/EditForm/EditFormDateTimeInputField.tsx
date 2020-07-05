import { Input } from '@rebass/forms';
import { format } from 'date-fns';
import React from 'react';

import { EditFormField } from './EditFormField';

function parseDate(input: string): Date | null {
  return input !== '' ? new Date(input) : null;
}

function convertIntoDateString(value: Date | null): string {
  return value === null
    ? ''
    : format(new Date(value), 'yyyy-MM-dd=HH:mm').replace('=', 'T');
}

export const EditFormDateTimeInputField: React.FunctionComponent<{
  value: Date | null;
  onChange: (value: Date | null) => void;
  isFirst?: boolean;
}> = ({ value, onChange, isFirst = false }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      const date = parseDate(value);
      onChange(date);
    },
    [onChange]
  );

  const dateString = React.useMemo(() => convertIntoDateString(value), [value]);

  return (
    <EditFormField isFirst={isFirst}>
      <Input type="datetime-local" value={dateString} onChange={handleChange} />
    </EditFormField>
  );
};
