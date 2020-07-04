import React from 'react';
import { Box } from 'rebass';
import { Color } from '../../../graphql/__generated__/baseTypes';
import { getColorCode } from '../../helpers/getColorCode';

export const ColorBox: React.FunctionComponent<{
  color: Color;
}> = ({ color }) => {
  const colorCode = getColorCode(color);
  return (
    <Box
      sx={{
        bg: colorCode,
        p: 1,
        width: 12,
        height: 12,
        border: '1px solid black',
      }}
    />
  );
};
