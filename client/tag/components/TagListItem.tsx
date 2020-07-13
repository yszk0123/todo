import React from 'react';

import { ListItem } from '../../shared/components/List';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagListIcon } from './TagListIcon';

export const TagListItem: React.FunctionComponent<{
  isActive: boolean;
  onClick: (tag: RootTagFragment) => void;
  tag: RootTagFragment;
}> = ({ isActive, onClick, tag }) => {
  return (
    <ListItem
      isActive={isActive}
      item={tag}
      leftElement={<TagListIcon />}
      mainElement={tag.name}
      onClick={onClick}
    />
  );
};
