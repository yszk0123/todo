import React from 'react';
import { Button } from 'rebass';

export const StatusBarButton: React.FunctionComponent<{
  isPrimary?: boolean;
  label: string;
  onClick: () => void;
}> = ({ isPrimary = false, label, onClick }) => {
  return (
    <Button
      mr={2}
      type={isPrimary ? 'submit' : 'button'}
      variant={isPrimary ? 'primary' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
