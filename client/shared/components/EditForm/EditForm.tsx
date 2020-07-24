import React from 'react';
import { Box } from 'rebass';

import { preventDefault } from '../../view_helpers/preventDefault';
import { stopPropagation } from '../../view_helpers/stopPropagation';

type Props = {
  isInline?: boolean;
};

export const EditForm: React.FunctionComponent<Props> = ({
  children,
  isInline = false,
}) => {
  return (
    <Box
      as="form"
      sx={{
        bg: 'background',
        px: 2,
        pt: 3,
        pb: 2,
        ...(isInline
          ? {}
          : {
              border: '1px solid',
              borderColor: 'primary',
              borderRadius: 4,
              boxShadow: 1,
              mb: 2,
            }),
      }}
      width="100%"
      onClick={stopPropagation}
      onSubmit={preventDefault}
    >
      {children}
    </Box>
  );
};
