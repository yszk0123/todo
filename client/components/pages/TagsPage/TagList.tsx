import React from 'react';

import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { TagListItem } from './TagListItem';

export const TagList: React.FunctionComponent<{
  tags: RootTagFragment[];
  currentTagId: ID | null;
  onClick: (tag: RootTagFragment) => void;
}> = ({ tags, currentTagId, onClick }) => {
  return (
    <List>
      {tags.map((tag) => {
        return (
          <TagListItem
            isActive={tag.id === currentTagId}
            key={tag.id}
            tag={tag}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
