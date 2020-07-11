import React from 'react';
import { Box } from 'rebass';

import { EmptyProps } from '../../../viewModels/EmptyProps';
import { preventDefault } from '../../helpers/preventDefault';
import { stopPropagation } from '../../helpers/stopPropagation';

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
        px: 2,
        pt: 3,
        pb: 2,
        mb: 2,
      }}
      onClick={stopPropagation}
      onSubmit={preventDefault}
    >
      {children}
    </Box>
  );
};
