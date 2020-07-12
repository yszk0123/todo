import React from 'react';

import { Color, getColorCode } from '../../view_models/Color';
import { Badge } from './Badge';

export const ColorBadge: React.FunctionComponent<{
  color: Color;
  text: string;
}> = ({ color, text }) => {
  const colorCode = getColorCode(color);

  return <Badge color={colorCode} text={text} />;
};
