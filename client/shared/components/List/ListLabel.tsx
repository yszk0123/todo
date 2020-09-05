import React from 'react';
import { Flex } from 'rebass';

import { Label } from '../Label';

type Props<T> = {
  item: T;
  onClick: (tag: T) => void;
};

function ListLabel<T extends { name: string }>(
  { item, onClick }: Props<T>,
  ref: React.Ref<unknown>
): JSX.Element | null {
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
      ref={ref}
      sx={{
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Label text={item.name} />
    </Flex>
  );
}

const ForwardedListLabel = React.forwardRef(ListLabel);

export { ForwardedListLabel as ListLabel };
