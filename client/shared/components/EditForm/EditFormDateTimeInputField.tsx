import { Input } from '@rebass/forms';
import { format } from 'date-fns';
import React from 'react';
import { Box } from 'rebass';

import {
  DateTime,
  parseDateTime,
  toDateTime,
} from '../../../view_models/DateTime';
import { CloseIcon } from '../CloseIcon';
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
  id: string;
  label: string;
  onChange: (value: DateTime | null) => void;
  value: DateTime | null;
}> = ({ id, label, onChange, value }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      const date = parseDate(value);
      onChange(date);
    },
    [onChange]
  );
  const handleReset = React.useCallback(() => {
    onChange(null);
  }, [onChange]);
  const dateString = React.useMemo(() => convertIntoDateString(value), [value]);

  return (
    <EditFormField
      htmlFor={id}
      label={label}
      rightElement={<CloseIcon onClick={handleReset} />}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Input
          id={id}
          type="datetime-local"
          value={dateString}
          onChange={handleChange}
        />
      </Box>
    </EditFormField>
  );
};
