import React from 'react';
import { Box } from 'rebass';
import { stopPropagation } from '../../../handlers/stopPropagation';

export const TagList: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Box mt={1} onClick={stopPropagation}>
      {children}
    </Box>
  );
};
