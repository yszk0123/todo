import React from 'react';
import { Text } from 'rebass';

import { EmptyProps } from '../../../viewModels/EmptyProps';

export const ListText: React.FunctionComponent<EmptyProps> = ({ children }) => {
  return <Text color="text">{children}</Text>;
};
