import React from 'react';
import { Box } from 'rebass';

import { Color, getColorCode } from '../../viewModels/Color';

export const ColorBox: React.FunctionComponent<{
  color: Color;
}> = ({ color }) => {
  const colorCode = getColorCode(color);
  return (
    <Box
      sx={{
        bg: colorCode,
        p: 1,
        width: 24,
        height: 24,
        border: '1px solid black',
      }}
    />
  );
};
