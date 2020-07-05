import React from 'react';
import { Box } from 'rebass';

import { stopPropagation } from '../../../handlers/stopPropagation';
import { EmptyProps } from '../../../viewModels/EmptyProps';

export const List: React.FunctionComponent<EmptyProps> = ({ children }) => {
  return (
    <Box mt={1} onClick={stopPropagation}>
      {children}
    </Box>
  );
};
