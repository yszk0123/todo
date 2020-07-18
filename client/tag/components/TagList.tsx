import React from 'react';

import { List } from '../../shared/components/List';
import { ID } from '../../view_models/ID';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagListItem } from './TagListItem';

export const TagList: React.FunctionComponent<{
  currentTagId: ID | null;
  onClick: (tag: RootTagFragment) => void;
  tags: RootTagFragment[];
}> = ({ currentTagId, onClick, tags }) => {
  const isSelectMode = currentTagId !== null;

  return (
    <List>
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
