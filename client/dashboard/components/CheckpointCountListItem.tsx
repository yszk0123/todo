import React from 'react';

import { CheckpointIcon } from '../../checkpoint/components/CheckpointIcon';
import { ListIcon, ListItem, ListText } from '../../shared/components/List';

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
      leftElement={<ListIcon icon={<CheckpointIcon />} />}
      mainElement={<ListText>{`${count} checkpoints`}</ListText>}
    />
  );
}
