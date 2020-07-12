import { Input } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  label: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}> = ({ label, onChange, value }) => {
  return (
    <EditFormField label={label}>
      <Box sx={{ flexGrow: 1 }}>
        <Input value={value} onChange={onChange} />
      </Box>
    </EditFormField>
  );
};
