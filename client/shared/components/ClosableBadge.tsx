import React from 'react';

import { Color, getColorCode, isLightColor } from '../../view_models/Color';
import { Badge } from './Badge';
import { CloseIcon } from './CloseIcon';

export const ClosableBadge: React.FunctionComponent<{
  color: Color;
  onClick: () => void;
  text: string;
}> = ({ color, onClick, text }) => {
  const colorCode = getColorCode(color);
  const lightColor = isLightColor(color);

  return (
    <Badge
      color={colorCode}
      icon={<CloseIcon />}
      isReverseColor={lightColor}
      text={text}
      onClick={onClick}
    />
  );
};
