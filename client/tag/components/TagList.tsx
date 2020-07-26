import React from 'react';

import { List } from '../../shared/components/List';
import { Note } from '../../shared/components/Note';
import { ID } from '../../view_models/ID';
import { TagGroup } from '../../view_models/Tag';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagListItem } from './TagListItem';

export const TagList: React.FunctionComponent<{
  currentTagId: ID | null;
  group: TagGroup;
  onClick: (tag: RootTagFragment) => void;
}> = ({ currentTagId, group, onClick }) => {
  const isSelectMode = currentTagId !== null;
  const header = group.header;
  const tags = group.tags;

  return (
    <List leftElement={header.name ? <Note text={header.name} /> : null}>
      {tags.map((tag) => {
        return (
          <TagListItem
            isSelected={tag.id === currentTagId}
            isSelectMode={isSelectMode}
            key={tag.id}
            tag={tag}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
