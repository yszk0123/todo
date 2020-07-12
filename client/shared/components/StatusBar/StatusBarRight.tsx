import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';
import { MiniList } from '../MiniList';

export const StatusBarRight: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex
      alignItems="center"
      flexGrow={1}
      flexShrink={0}
      justifyContent="flex-end"
    >
      <MiniList>{children}</MiniList>
    </Flex>
  );
};
