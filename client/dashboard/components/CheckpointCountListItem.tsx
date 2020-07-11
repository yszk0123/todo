import React from 'react';

import { ListItem, ListText } from '../../shared/components/List';

export function CheckpointCountListItem({
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
      mainElement={<ListText>{`${count} checkpoints`}</ListText>}
    />
  );
}
