import React from 'react';
import { Box } from 'rebass';
import { defaultTagColor } from '../../../theme/defaultTagColor';

export const ColorBox: React.FunctionComponent<{
  color: string | null | undefined;
}> = ({ color }) => {
  return (
    <Box
      sx={{
        bg: color ?? defaultTagColor,
        p: 1,
        width: 12,
        height: 12,
        border: '1px solid black',
      }}
    />
  );
};
