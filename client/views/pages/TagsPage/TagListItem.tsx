import React from 'react';

import { RootTagFragment } from '../../../graphql/__generated__/Tag.graphql';
import { ListItem } from '../../layout/List';

export const TagListItem: React.FunctionComponent<{
  isActive: boolean;
  onClick: (tag: RootTagFragment) => void;
  tag: RootTagFragment;
}> = ({ isActive, onClick, tag }) => {
  return (
    <ListItem
      isActive={isActive}
      item={tag}
      mainElement={tag.name}
      onClick={onClick}
    />
  );
};
