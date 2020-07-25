import React from 'react';
import { Flex } from 'rebass';

import { Label } from '../Label';

export function ListLabel<T extends { name: string }>({
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
    <Flex
      ml={1}
      sx={{
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Label text={item.name} />
    </Flex>
  );
}
