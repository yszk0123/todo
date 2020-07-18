import React from 'react';

import { ListIconCheckbox } from '../../shared/components/List';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { CategoryIcon } from './CategoryIcon';

type Props = {
  category: RootCategoryFragment;
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (category: RootCategoryFragment) => void;
};

export const CategoryListIcon: React.FunctionComponent<Props> = ({
  category,
  isSelectMode,
  isSelected,
  onClick,
}) => {
  return (
    <ListIconCheckbox
      icon={isSelectMode ? null : CategoryIcon}
      isSelected={isSelected}
      item={category}
      label="selected"
      onClick={onClick}
    />
  );
};
