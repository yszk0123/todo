import React from 'react';

import { CategoryTagFragment } from '../../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { Badge } from '../../../layout/Badge';
import { EditFormChecklistField } from '../../../layout/EditForm';

export function TodoEditFormTagsField({
  tags,
  categoryTags,
  onToggleTag,
}: {
  tags: CategoryTagFragment[] | null;
  categoryTags: CategoryTagFragment[];
  onToggleTag: (tag: CategoryTagFragment) => void;
}): JSX.Element {
  return (
    <EditFormChecklistField
      checkedItems={tags ?? []}
      items={categoryTags}
      rightElement={!tags ? <Badge text="preserved" /> : null}
      onClick={onToggleTag}
    />
  );
}
