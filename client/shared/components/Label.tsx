import React from 'react';
import { Box } from 'rebass';

export const Label: React.FunctionComponent<{
  color?: string;
  text: string;
}> = ({ color = 'black', text }) => {
  return (
    <Box
      sx={{
        color: 'white',
        bg: color,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        px: 2,
        py: 1,
        fontSize: 1,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'dark',
      }}
    >
      {text}
    </Box>
  );
};
