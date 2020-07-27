import React from 'react';
import { Flex } from 'rebass';

type Props = {
  icon: JSX.Element;
  label?: string;
  onClick?: () => void;
};

export function ListIcon({ icon, label, onClick }: Props): JSX.Element {
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
      color="gray"
      justifyContent="center"
      sx={{ ':hover': { opacity: 0.7 } }}
      onClick={handleClick}
    >
      {icon}
    </Flex>
  );
}
