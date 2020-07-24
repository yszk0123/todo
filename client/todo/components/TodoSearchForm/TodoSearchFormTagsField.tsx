import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormBadgeSelectField } from '../../../shared/components/EditForm';
import { EMPTY } from '../../../shared/constants/EMPTY';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';

const getColor = (tag: TodoTagFragment) => tag.color;
const getValue = (tag: TodoTagFragment) => tag.id;
const getDisplayName = (tag: TodoTagFragment) => tag.name;

export function TodoSearchFormTagsField({
  categoryTags,
  onToggleTag,
  tags,
}: {
  categoryTags: TodoTagFragment[];
  onToggleTag: (tag: TodoTagFragment) => void;
  tags: TodoTagFragment[] | null;
}): JSX.Element | null {
  return (
    <EditFormBadgeSelectField
      getColor={getColor}
      getDisplayName={getDisplayName}
      getValue={getValue}
      id="todo-search-tags"
      items={categoryTags}
      label="Tags"
      rightElement={!tags ? <Badge text="preserved" /> : null}
      selectedItems={tags ?? EMPTY}
      onDeselect={onToggleTag}
      onSelect={onToggleTag}
    />
  );
}
