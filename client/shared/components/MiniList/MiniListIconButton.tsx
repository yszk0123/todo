import React from 'react';
import { Flex } from 'rebass';

type Props = {
  icon: JSX.Element;
  isSelected?: boolean;
  label: string;
  onClick?: () => void;
};

export function MiniListIconButton({
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
    <Flex
      alignItems="center"
      aria-label={label}
      color={isSelected ? 'primary' : 'gray'}
      justifyContent="center"
      mr={2}
      role="button"
      sx={{ ':hover': { opacity: 0.7 }, cursor: 'pointer' }}
      onClick={handleClick}
    >
      {icon}
    </Flex>
  );
}
