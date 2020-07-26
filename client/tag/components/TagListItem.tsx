import React from 'react';

import { ListBadge, ListItem, ListLine } from '../../shared/components/List';
import { noop } from '../../shared/helpers/noop';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagListIcon } from './TagListIcon';
import { TagListLink } from './TagListLink';

export const TagListItem: React.FunctionComponent<{
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (tag: RootTagFragment) => void;
  tag: RootTagFragment;
}> = ({ isSelectMode, isSelected, onClick, tag }) => {
  return (
    <ListItem
      isActive={isSelected}
      item={tag}
      leftElement={
        <TagListIcon
          isSelected={isSelected}
          isSelectMode={isSelectMode}
          tag={tag}
          onClick={onClick}
        />
      }
      mainElement={
        <ListLine
          leftElement={<ListBadge item={tag} onClick={noop} />}
          rightElement={
            tag.parent ? (
              <ListBadge item={tag.parent} onClick={noop} />
            ) : undefined
          }
        />
      }
      rightElement={<TagListLink tag={tag} />}
      onClick={onClick}
    />
  );
};
