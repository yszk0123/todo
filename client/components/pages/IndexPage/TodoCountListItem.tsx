import React from 'react';

import { ListItem, ListText } from '../../layout/List';

export function TodoCountListItem({
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
      mainElement={<ListText>{`${count} todos`}</ListText>}
    />
  );
}
