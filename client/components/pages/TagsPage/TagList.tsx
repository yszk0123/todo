import React from 'react';
import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';
import { TagListItem } from './TagListItem';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';

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
            key={tag.id}
            tag={tag}
            isActive={tag.id === currentTagId}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
