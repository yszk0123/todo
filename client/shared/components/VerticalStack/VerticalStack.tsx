import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';

export const VerticalStack: React.FunctionComponent<EmptyProps> = ({
  children,
}) => {
  return (
    <Flex flexDirection="column" height="100%">
      {children}
    </Flex>
  );
};
