import React from 'react';

import { Color, getColorCode } from '../../view_models/Color';
import { Badge } from './Badge';
import { CloseIcon } from './CloseIcon';

export const ClosableBadge: React.FunctionComponent<{
  color: Color;
  onClick: () => void;
  text: string;
}> = ({ color, onClick, text }) => {
  const colorCode = getColorCode(color);

  return (
    <Badge
      color={colorCode}
      icon={<CloseIcon />}
      text={text}
      onClick={onClick}
    />
  );
};
