import React from 'react';

import { ColorBox } from '../../shared/components/ColorBox';
import { ListItem, ListText } from '../../shared/components/List';
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
        <ListText subElement={<ColorBox color={tag.color} />}>
          {tag.name}
        </ListText>
      }
      rightElement={<TagListLink tag={tag} />}
      onClick={onClick}
    />
  );
};
