import React from 'react';

import { ListItem } from '../../shared/components/List';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagListIcon } from './TagListIcon';

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
      mainElement={tag.name}
      onClick={onClick}
    />
  );
};
