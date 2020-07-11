import React from 'react';

import { ListItem, ListText } from '../../components/List';

export function TagCountListItem({
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
      mainElement={<ListText>{`${count} tags`}</ListText>}
    />
  );
}
