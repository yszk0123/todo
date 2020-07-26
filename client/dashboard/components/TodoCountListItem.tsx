import React from 'react';

import { ListIcon, ListItem, ListText } from '../../shared/components/List';
import { TodoIcon } from '../../todo/components/TodoIcon';

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
      leftElement={<ListIcon icon={<TodoIcon />} />}
      mainElement={<ListText>{`${count} todos`}</ListText>}
    />
  );
}
