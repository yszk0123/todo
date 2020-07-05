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
      sx={{
        width: '100vw',
        mx: 'auto',
        p: 2,
        overflowX: 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
