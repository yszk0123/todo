import React from 'react';
import { Button } from 'rebass';

import { EditFormField } from './EditFormField';

export type EditFormAction = {
  label: string;
  onClick: () => void;
};

const EditFormButton: React.FunctionComponent<{
  label: string;
  onClick: () => void;
  isFirst: boolean;
  isPrimary: boolean;
}> = ({ label, onClick, isFirst, isPrimary }) => {
  return (
    <Button
      sx={{ flexGrow: isPrimary ? 1 : undefined, ml: isFirst ? 0 : 2 }}
      type={isPrimary ? 'submit' : 'button'}
      variant={isPrimary ? 'primary' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export const EditFormActionsField: React.FunctionComponent<{
  actions: EditFormAction[];
}> = ({ actions }) => {
  if (actions.length === 0) {
    return null;
  }

  const lastIndex = actions.length - 1;

  return (
    <EditFormField>
      {actions.map((action, i) => {
        return (
          <EditFormButton
            isFirst={i === 0}
            isPrimary={i === lastIndex}
            key={i}
            label={action.label}
            onClick={action.onClick}
          />
        );
      })}
    </EditFormField>
  );
};
