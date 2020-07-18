import React from 'react';

import { Checkbox } from '../Checkbox';

type Props = {
  icon: React.ElementType;
  isSelected?: boolean;
  label: string;
  onClick?: () => void;
};

export function MiniListIconCheckbox({
  icon,
  isSelected = false,
  label,
  onClick,
}: Props): JSX.Element {
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      if (onClick) {
        event.stopPropagation();
        onClick();
      }
    },
    [onClick]
  );

  return (
    <Checkbox
      aria-label={label}
      checked={isSelected}
      icon={icon}
      readOnly
      onClick={handleClick}
    />
  );
}
