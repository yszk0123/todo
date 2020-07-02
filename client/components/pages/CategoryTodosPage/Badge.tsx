import React from 'react';
import { Box } from 'rebass';
import { defaultTagColor } from '../../../theme/defaultTagColor';

export const Badge: React.FunctionComponent<{
  text: string;
  color: string | null | undefined;
}> = ({ text, color }) => {
  return (
    <Box
      sx={{
        color: 'white',
        bg: color ?? defaultTagColor,
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
