import React from 'react';
import { Flex } from 'rebass';

type Props = {
  icon: JSX.Element;
  onClick?: () => void;
};

export function MiniListIcon({ icon, onClick }: Props): JSX.Element {
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
      justifyContent="center"
      mr={1}
      onClick={handleClick}
    >
      {icon}
    </Flex>
  );
}
