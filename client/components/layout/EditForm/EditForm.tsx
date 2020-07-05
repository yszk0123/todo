import React from 'react';
import { Box } from 'rebass';

import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';

type Props = {
  isFirst?: boolean;
};

export const EditForm: React.FunctionComponent<Props> = ({
  isFirst = false,
  children,
}) => {
  return (
    <Box
      as="form"
      sx={{ boxShadow: 1, p: 2, mt: isFirst ? 0 : 2 }}
      onClick={stopPropagation}
      onSubmit={preventDefault}
    >
      {children}
    </Box>
  );
};
