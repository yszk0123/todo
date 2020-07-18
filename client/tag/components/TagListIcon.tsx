import React from 'react';

import { ListIconCheckbox } from '../../shared/components/List';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { TagIcon } from './TagIcon';

type Props = {
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (tag: RootTagFragment) => void;
  tag: RootTagFragment;
};

export const TagListIcon: React.FunctionComponent<Props> = ({
  isSelectMode,
  isSelected,
  onClick,
  tag,
}) => {
  return (
    <ListIconCheckbox
      icon={isSelectMode ? null : TagIcon}
      isSelected={isSelected}
      item={tag}
      label="selected"
      onClick={onClick}
    />
  );
};
