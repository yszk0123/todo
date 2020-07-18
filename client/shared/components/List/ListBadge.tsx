import React from 'react';
import { Box } from 'rebass';

import { Color } from '../../../view_models/Color';
import { ColorBadge } from '../ColorBadge';

export function ListBadge<T extends { color: Color; name: string }>({
  item,
  onClick,
}: {
  item: T;
  onClick: (tag: T) => void;
}): JSX.Element | null {
  const handleClick = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      onClick(item);
    },
    [item, onClick]
  );

  return (
    <Box display="inline-block" ml={1} onClick={handleClick}>
      <ColorBadge color={item.color} text={item.name} />
    </Box>
  );
}
