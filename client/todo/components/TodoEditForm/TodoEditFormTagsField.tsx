import React from 'react';

import { Badge } from '../../../shared/components/Badge';
import { EditFormBadgeSelectField } from '../../../shared/components/EditForm';
import { EMPTY } from '../../../shared/constants/EMPTY';
import { getIndexedDisplayName } from '../../../shared/view_helpers/getIndexedDisplayName';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';

const getColor = (tag: TodoTagFragment) => tag.color;
const getValue = (tag: TodoTagFragment) => tag.id;
const getBadgeDisplayName = (tag: TodoTagFragment) => tag.name;
const getSelectDisplayName = (tag: TodoTagFragment, i: number) =>
  getIndexedDisplayName(tag.name, i);

export function TodoEditFormTagsField({
  categoryTags,
  onChangeTags,
  tags,
}: {
  categoryTags: TodoTagFragment[];
  onChangeTags: (tags: TodoTagFragment[]) => void;
  tags: TodoTagFragment[] | null;
}): JSX.Element | null {
  if (categoryTags.length === 0) {
    return null;
  }

  return (
    <EditFormBadgeSelectField
      getBadgeDisplayName={getBadgeDisplayName}
      getColor={getColor}
      getSelectDisplayName={getSelectDisplayName}
      getValue={getValue}
      id="todo-edit-tags"
      items={categoryTags}
      label="Tags"
      rightElement={!tags ? <Badge text="preserved" /> : null}
      selectedItems={tags ?? EMPTY}
      onChange={onChangeTags}
    />
  );
}
