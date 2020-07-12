import React from 'react';
import { Flex } from 'rebass';

type Props = {
  isPrimary?: boolean;
};

export const MiniListItem: React.FunctionComponent<Props> = ({
  children,
  isPrimary = false,
}) => {
  return (
    <Flex
      alignItems="center"
      mr={1}
      sx={{ flexGrow: isPrimary ? 1 : undefined }}
    >
      {children}
    </Flex>
  );
};
