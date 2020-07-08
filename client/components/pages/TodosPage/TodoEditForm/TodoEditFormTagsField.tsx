import React from 'react';

import { CategoryTagFragment } from '../../../../graphql/fragments/__generated__/TodoTag.graphql';
import { Badge } from '../../../layout/Badge';
import { EditFormChecklistField } from '../../../layout/EditForm';

export function TodoEditFormTagsField({
  categoryTags,
  onToggleTag,
  tags,
}: {
  categoryTags: CategoryTagFragment[];
  onToggleTag: (tag: CategoryTagFragment) => void;
  tags: CategoryTagFragment[] | null;
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
