import React from 'react';

import { ListIcon, ListItem, ListText } from '../../shared/components/List';
import { TagIcon } from '../../tag/components/TagIcon';

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
      leftElement={<ListIcon icon={<TagIcon />} />}
      mainElement={<ListText>{`${count} tags`}</ListText>}
    />
  );
}
