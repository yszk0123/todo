import { Input } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  label: string;
  onChange: (value: string) => void;
  value: string;
}> = ({ label, onChange, value }) => {
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      onChange(value);
    },
    [onChange]
  );

  return (
    <EditFormField label={label}>
      <Box sx={{ flexGrow: 1 }}>
        <Input value={value} onChange={handleChange} />
      </Box>
    </EditFormField>
  );
};
