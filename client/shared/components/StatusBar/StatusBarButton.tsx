import React from 'react';
import { Button } from 'rebass';

export const StatusBarButton: React.FunctionComponent<{
  isPrimary?: boolean;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}> = ({ isPrimary = false, isSelected, label, onClick }) => {
  return (
    <Button
      color={isSelected ? 'white' : undefined}
      mr={2}
      type={isPrimary ? 'submit' : 'button'}
      variant={isPrimary ? 'primary' : 'outline'}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
