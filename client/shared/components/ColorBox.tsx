import React from 'react';
import { Box } from 'rebass';

import { Color, getColorCode } from '../../view_models/Color';

const BOX_SIZE = 24;

export const ColorBox: React.FunctionComponent<{
  color: Color;
}> = ({ color }) => {
  const colorCode = getColorCode(color);
  return (
    <Box
      sx={{
        bg: colorCode,
        p: 1,
        width: BOX_SIZE,
        height: BOX_SIZE,
        border: '1px solid black',
      }}
    />
  );
};
