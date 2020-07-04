import React from 'react';
import { Input } from '@rebass/forms';
import { EditFormField } from './EditFormField';

export const EditFormInputField: React.FunctionComponent<{
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  isFirst?: boolean;
}> = ({ value, onChange, isFirst = false }) => {
  return (
    <EditFormField isFirst={isFirst}>
      <Input value={value} onChange={onChange} />
    </EditFormField>
  );
};
