import React from 'react';
import { Box } from 'rebass';

export const Badge: React.FunctionComponent<{
  color?: string;
  text: string;
}> = ({ color = 'gray', text }) => {
  return (
    <Box
      sx={{
        color: 'white',
        bg: color,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        px: 2,
        py: 1,
        fontSize: 10,
        borderRadius: 9999,
        border: '1px solid',
        borderColor: 'dark',
      }}
    >
      {text}
    </Box>
  );
};
