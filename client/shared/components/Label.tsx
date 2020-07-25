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
      }}
      variant="label"
    >
      {text}
    </Box>
  );
};
