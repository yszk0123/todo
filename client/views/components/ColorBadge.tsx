import React from 'react';

import { Color, getColorCode } from '../../viewModels/Color';
import { Badge } from './Badge';

export const ColorBadge: React.FunctionComponent<{
  color: Color;
  text: string;
}> = ({ color, text }) => {
  const colorCode = getColorCode(color);

  return <Badge color={colorCode} text={text} />;
};
