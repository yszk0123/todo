import React from 'react';

import { Color } from '../../graphql/__generated__/baseTypes';
import { getColorCode } from '../helpers/getColorCode';
import { Badge } from './Badge';

export const ColorBadge: React.FunctionComponent<{
  color: Color;
  text: string;
}> = ({ text, color }) => {
  const colorCode = getColorCode(color);

  return <Badge color={colorCode} text={text} />;
};
