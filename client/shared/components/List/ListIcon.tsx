import React from 'react';
import { Flex } from 'rebass';

type Props = {
  icon: JSX.Element;
  onClick?: () => void;
};

export function ListIcon({ icon, onClick }: Props): JSX.Element {
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
      color="gray"
      fontSize={24}
      justifyContent="center"
      sx={{ ':hover': { opacity: 0.7 } }}
      onClick={handleClick}
    >
      {icon}
    </Flex>
  );
}
