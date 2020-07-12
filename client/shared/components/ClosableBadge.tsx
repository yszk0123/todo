import React from 'react';
import { MdClose } from 'react-icons/md';

import { Color, getColorCode } from '../../view_models/Color';
import { Badge } from './Badge';

export const ClosableBadge: React.FunctionComponent<{
  color: Color;
  onClick: () => void;
  text: string;
}> = ({ color, onClick, text }) => {
  const colorCode = getColorCode(color);

  return (
    <Badge color={colorCode} icon={<MdClose />} text={text} onClick={onClick} />
  );
};
