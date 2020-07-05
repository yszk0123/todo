import { Input } from '@rebass/forms';
import React from 'react';

import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ value, onChange }) => {
  return (
    <EditFormField>
      <Input value={value} onChange={onChange} />
    </EditFormField>
  );
};
