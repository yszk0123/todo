import React from 'react';
import { Flex } from 'rebass';

import { Color } from '../../../view_models/Color';
import { ID } from '../../../view_models/ID';
import { ListBadge } from './ListBadge';

type Props<T> = {
  items: T[];
  onClick: (tag: T) => void;
};

function ListBadges<T extends { color: Color; id: ID; name: string }>(
  { items, onClick }: Props<T>,
  ref: React.Ref<unknown>
): JSX.Element | null {
  if (items.length === 0) {
    return null;
  }

  return (
    <Flex justifyContent="flex-end" ref={ref}>
      {items.map((item) => (
        <ListBadge item={item} key={item.id} onClick={onClick} />
      ))}
    </Flex>
  );
}

const ForwardedListBadges = React.forwardRef(ListBadges);
const MemoizedForwardedListBadges = React.memo(ForwardedListBadges);

export { MemoizedForwardedListBadges as ListBadges };
