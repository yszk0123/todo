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
      fontSize={24}
      icon={icon}
      mr={2}
      sx={{
        ':hover': { opacity: 0.7 },
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={handleClick}
    />
  );
}
