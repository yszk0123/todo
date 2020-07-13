import React from 'react';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CategoryIcon } from './CategoryIcon';

export const CategoryStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
  selectMode: SelectMode;
}> = ({ count, onClickEdit, selectMode }) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar isSelected={selected}>
      <StatusBarLeft>
        <StatusBarText text={`${count} categories`} />
        <StatusBarItem>
          <CategoryIcon />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        <StatusBarButton isPrimary label="Edit" onClick={onClickEdit} />
      </StatusBarRight>
    </StatusBar>
  );
};
