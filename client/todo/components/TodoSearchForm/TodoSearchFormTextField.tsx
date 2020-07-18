import React from 'react';

import { EditFormInputField } from '../../../shared/components/EditForm';

type Props = {
  onChangeText: (text: string) => void;
  text: string;
};

export function TodoSearchFormTextField({ onChangeText, text }: Props) {
  return (
    <EditFormInputField
      id="todo-search-text"
      label="Text"
      value={text}
      onChange={onChangeText}
    />
  );
}
