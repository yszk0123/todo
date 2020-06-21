import React from 'react';
import { Box } from 'rebass';

type Props = {};

export const ContentWrapper: React.FunctionComponent<Props> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        maxWidth: 1024,
        mx: 'auto',
        px: 2,
      }}
    >
      {children}
    </Box>
  );
};
