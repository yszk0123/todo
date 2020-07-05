import React from 'react';
import { Box } from 'rebass';
import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { EmptyProps } from '../../../viewModels/EmptyProps';

export const EditForm: React.FunctionComponent<EmptyProps> = ({ children }) => {
  return (
    <Box
      as="form"
      sx={{ boxShadow: 1, p: 2 }}
      onClick={stopPropagation}
      onSubmit={preventDefault}
    >
      {children}
    </Box>
  );
};
