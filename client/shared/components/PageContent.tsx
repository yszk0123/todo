import React from 'react';
import { Box } from 'rebass';

type Props = {
  onClick?: React.MouseEventHandler;
};

export const PageContent: React.FunctionComponent<Props> = ({
  children,
  onClick,
}) => {
  return (
    <Box
      sx={{
        width: '100vw',
        mx: 'auto',
        p: 3,
        overflowX: 'hidden',
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};
