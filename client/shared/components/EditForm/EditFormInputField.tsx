import { Input } from '@rebass/forms';
import React from 'react';

import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}> = ({ onChange, value }) => {
  return (
    <EditFormField>
      <Input value={value} onChange={onChange} />
    </EditFormField>
  );
};
