import React from 'react';
import { Flex } from 'rebass';

import { EmptyProps } from '../../../view_models/EmptyProps';

export const MiniList: React.FunctionComponent<EmptyProps> = ({ children }) => {
  return <Flex alignItems="center">{children}</Flex>;
};
