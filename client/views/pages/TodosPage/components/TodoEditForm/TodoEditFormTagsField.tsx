import React from 'react';

import { TodoTagFragment } from '../../../../../graphql/__generated__/Todo.graphql';
import { Badge } from '../../../../components/Badge';
import { EditFormChecklistField } from '../../../../components/EditForm';

export function TodoEditFormTagsField({
  categoryTags,
  onToggleTag,
  tags,
}: {
  categoryTags: TodoTagFragment[];
  onToggleTag: (tag: TodoTagFragment) => void;
  tags: TodoTagFragment[] | null;
}): JSX.Element | null {
  if (categoryTags.length === 0) {
    return null;
  }

  return (
    <EditFormChecklistField
      checkedItems={tags ?? []}
      items={categoryTags}
      rightElement={!tags ? <Badge text="preserved" /> : null}
      onClick={onToggleTag}
    />
  );
}
