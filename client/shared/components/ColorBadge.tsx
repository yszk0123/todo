import React from 'react';

import { Color, getColorCode, isLightColor } from '../../view_models/Color';
import { Badge } from './Badge';

export const ColorBadge: React.FunctionComponent<{
  color: Color;
  text: string;
}> = ({ color, text }) => {
  const colorCode = getColorCode(color);
  const lightColor = isLightColor(color);

  return <Badge color={colorCode} isReverseColor={lightColor} text={text} />;
};
