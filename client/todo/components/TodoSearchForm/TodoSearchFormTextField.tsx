import React from 'react';

import { EditFormInputField } from '../../../shared/components/EditForm';

type Props = {
  onChangeText: (text: string) => void;
  text: string;
};

export function TodoSearchFormTextField({ onChangeText, text }: Props) {
  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = event.currentTarget.value;
      onChangeText(text);
    },
    [onChangeText]
  );

  return (
    <EditFormInputField label="Text" value={text} onChange={handleChangeText} />
  );
}
