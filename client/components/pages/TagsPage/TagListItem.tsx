import React from 'react';

import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';
import { ListItem } from '../../layout/List';

export const TagListItem: React.FunctionComponent<{
  isActive: boolean;
  tag: RootTagFragment;
  onClick: (tag: RootTagFragment) => void;
}> = ({ isActive, tag, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={tag}
      mainElement={tag.name}
      onClick={onClick}
    />
  );
};
