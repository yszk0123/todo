import React from 'react';
import { Flex } from 'rebass';

import { Color } from '../../../view_models/Color';
import { ID } from '../../../view_models/ID';
import { ListBadge } from './ListBadge';

function ListBadges<T extends { color: Color; id: ID; name: string }>({
  items,
  onClick,
}: {
  items: T[];
  onClick: (tag: T) => void;
}): JSX.Element | null {
  if (items.length === 0) {
    return null;
  }

  return (
    <Flex justifyContent="flex-end">
      {items.map((item) => (
        <ListBadge item={item} key={item.id} onClick={onClick} />
      ))}
    </Flex>
  );
}

const MemoizedListBadges = React.memo(ListBadges) as typeof ListBadges;

export { MemoizedListBadges as ListBadges };
