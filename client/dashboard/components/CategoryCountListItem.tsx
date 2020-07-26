import React from 'react';

import { CategoryIcon } from '../../category/components/CategoryIcon';
import { ListIcon, ListItem, ListText } from '../../shared/components/List';

export function CategoryCountListItem({
  count,
}: {
  count: number | null;
}): JSX.Element | null {
  if (count === null) {
    return null;
  }

  return (
    <ListItem
      item={null}
      leftElement={<ListIcon icon={<CategoryIcon />} />}
      mainElement={<ListText>{`${count} categories`}</ListText>}
    />
  );
}
