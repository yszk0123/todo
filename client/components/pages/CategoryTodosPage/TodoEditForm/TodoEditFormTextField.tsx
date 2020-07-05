import React from 'react';

import { EditFormInputField } from '../../../layout/EditForm';

type Props = {
  onChangeText: (text: string) => void;
  text: string;
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
