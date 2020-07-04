import React from 'react';
import { Box } from 'rebass';
import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';

export const EditForm: React.FunctionComponent<{}> = ({ children }) => {
  return (
    <Box
      sx={{ boxShadow: 1, p: 2 }}
      as="form"
      onSubmit={preventDefault}
      onClick={stopPropagation}
    >
      {children}
    </Box>
  );
};
