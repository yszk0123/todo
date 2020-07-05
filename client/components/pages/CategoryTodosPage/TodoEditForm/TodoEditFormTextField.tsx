import React from 'react';

import { EditFormInputField } from '../../../layout/EditForm';

type Props = {
  text: string;
  onChangeText: (text: string) => void;
};

export function TodoEditFormTextField({ text, onChangeText }: Props) {
  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = event.currentTarget.value;
      onChangeText(text);
    },
    [onChangeText]
  );

  return <EditFormInputField value={text} onChange={handleChangeText} />;
}
