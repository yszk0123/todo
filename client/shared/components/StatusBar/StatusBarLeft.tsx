import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../viewModels/EmptyProps';
import { MiniList } from '../MiniList';

export const StatusBarLeft: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex alignItems="center" justifyContent="flex-start">
      <MiniList>{children}</MiniList>
    </Flex>
  );
};
