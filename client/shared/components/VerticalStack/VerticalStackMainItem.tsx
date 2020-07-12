import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';

export const VerticalStackMainItem: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex flexGrow={1} width={1}>
      {children}
    </Flex>
  );
};
