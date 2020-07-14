import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';

export const StatusBarSecondaryRow: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex
      bg="background"
      color="gray"
      fontSize={2}
      justifyContent="space-between"
      p={2}
    >
      {children}
    </Flex>
  );
};
