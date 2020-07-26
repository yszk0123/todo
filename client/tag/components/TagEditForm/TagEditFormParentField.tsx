import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormSelectField } from '../../../shared/components/EditForm';
import { RootTagFragment } from '../../graphql/__generated__/Tag.graphql';

const getValue = (category: RootTagFragment) => category.id;
const getDisplayName = (category: RootTagFragment) => category.name;

export function TagEditFormParentField({
  onChange,
  selectedParent,
  tags,
}: {
  onChange: (parent: RootTagFragment | null) => void;
  selectedParent: RootTagFragment | null;
  tags: RootTagFragment[];
}): JSX.Element | null {
  if (tags.length === 0) {
    return null;
  }

  return (
    <EditFormSelectField
      getDisplayName={getDisplayName}
      getValue={getValue}
      id="tag-edit-parent"
      items={tags}
      label="Parent"
      rightElement={!selectedParent ? <Badge text="preserved" /> : null}
      selectedItem={selectedParent}
      onChange={onChange}
    />
  );
}
