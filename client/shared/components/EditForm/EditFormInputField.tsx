import { Input } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  autoFocus?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}> = ({ autoFocus = false, id, label, onChange, value }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      onChange(value);
    },
    [onChange]
  );

  return (
    <EditFormField htmlFor={id} label={label}>
      <Box sx={{ flexGrow: 1 }}>
        <Input
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          id={id}
          value={value}
          onChange={handleChange}
        />
      </Box>
    </EditFormField>
  );
};
