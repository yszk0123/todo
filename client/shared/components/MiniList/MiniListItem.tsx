import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../viewModels/EmptyProps';

export const MiniListItem: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex alignItems="center" mr={1}>
      {children}
    </Flex>
  );
};
