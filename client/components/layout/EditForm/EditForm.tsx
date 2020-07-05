import React from 'react';
import { Box } from 'rebass';

import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { EmptyProps } from '../../../viewModels/EmptyProps';

type Props = EmptyProps;

export const EditForm: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <Box
      as="form"
      sx={{
        border: '1px solid',
        borderColor: 'primary',
        borderRadius: 4,
        boxShadow: 1,
        p: 2,
        mb: 2,
      }}
      onClick={stopPropagation}
      onSubmit={preventDefault}
    >
      {children}
    </Box>
  );
};
