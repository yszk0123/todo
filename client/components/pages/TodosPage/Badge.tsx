import React from 'react';
import { Box } from 'rebass';

export const Badge: React.FunctionComponent<{ text: string }> = ({ text }) => {
  return (
    <Box
      sx={{
        borderWidth: 2,
        borderColor: 'gray',
        borderStyle: 'solid',
        display: 'inline-block',
        px: 2,
        py: 1,
        borderRadius: 9999,
      }}
    >
      {text}
    </Box>
  );
};
