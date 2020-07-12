import React from 'react';
import { MdList } from 'react-icons/md';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';
import { isSelected, SelectMode } from '../../view_models/SelectMode';

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
          <MdList />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        <StatusBarButton isPrimary label="Edit" onClick={onClickEdit} />
      </StatusBarRight>
    </StatusBar>
  );
};
