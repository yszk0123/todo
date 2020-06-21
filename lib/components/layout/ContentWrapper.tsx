import React from 'react';
import { Box } from 'rebass';

type Props = {
  onClick?: React.MouseEventHandler;
};

export const ContentWrapper: React.FunctionComponent<Props> = ({
  children,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
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
