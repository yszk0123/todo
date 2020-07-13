import React from 'react';

import { EditFormInputField } from '../../../shared/components/EditForm';

type Props = {
  onChangeText: (text: string) => void;
  text: string;
};

export function TodoEditFormTextField({ onChangeText, text }: Props) {
  return (
    <EditFormInputField label="Text" value={text} onChange={onChangeText} />
  );
}
