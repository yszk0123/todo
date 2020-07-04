import React from 'react';
import { Box } from 'rebass';
import { getColorCode } from '../helpers/getColorCode';
import { Color } from '../../graphql/__generated__/baseTypes';

export const ColorBadge: React.FunctionComponent<{
  text: string;
  color: Color;
}> = ({ text, color }) => {
  const colorCode = getColorCode(color);

  return (
    <Box
      sx={{
        color: 'white',
        bg: colorCode,
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
