import { Input } from '@rebass/forms';
import { format } from 'date-fns';
import React from 'react';
import { Box } from 'rebass';

import {
  DateTime,
  parseDateTime,
  toDateTime,
} from '../../../view_models/DateTime';
import { EditFormField } from './EditFormField';

function parseDate(input: string): DateTime | null {
  return input !== '' ? toDateTime(input) : null;
}

function convertIntoDateString(value: DateTime | null): string {
  return value === null
    ? ''
    : format(parseDateTime(value), 'yyyy-MM-dd=HH:mm').replace('=', 'T');
}

export const EditFormDateTimeInputField: React.FunctionComponent<{
  label: string;
  onChange: (value: DateTime | null) => void;
  value: DateTime | null;
}> = ({ label, onChange, value }) => {
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
    <EditFormField label={label}>
      <Box sx={{ flexGrow: 1 }}>
        <Input
          type="datetime-local"
          value={dateString}
          onChange={handleChange}
        />
      </Box>
    </EditFormField>
  );
};
