import React from 'react';
import { Flex } from 'rebass';

type Props = {
  isPrimary?: boolean;
  onClick?: () => void;
};

export const MiniListItem: React.FunctionComponent<Props> = ({
  children,
  isPrimary = false,
  onClick,
}) => {
  const isClickable = !!onClick;

  return (
    <Flex
      alignItems="center"
      aria-label={isClickable ? 'item' : undefined}
      mr={1}
      role={isClickable ? 'button' : undefined}
      sx={{
        flexShrink: 0,
        flexGrow: isPrimary ? 1 : undefined,
        cursor: isClickable ? 'pointer' : undefined,
      }}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
