import React from 'react';
import { Box } from 'rebass';

export const Badge: React.FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <Box
      sx={{
        color: 'white',
        bg: 'gray',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        px: 2,
        py: 1,
        fontSize: 10,
        borderRadius: 9999,
      }}
    >
      {text}
    </Box>
  );
};
