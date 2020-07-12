import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';

export const VerticalStackItem: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex flexShrink={0} width={1}>
      {children}
    </Flex>
  );
};
