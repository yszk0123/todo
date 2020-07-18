import React from 'react';

import { Radio } from '../Radio';

type Props = {
  icon: React.ElementType;
  isSelected?: boolean;
  label: string;
  onClick?: () => void;
};

export function MiniListIconRadio({
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
    <Radio
      aria-label={label}
      color={isSelected ? 'primary' : 'gray'}
      icon={icon}
      onClick={handleClick}
    />
  );
}
