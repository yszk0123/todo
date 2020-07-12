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

export const CategoryStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
}> = ({ count, onClickEdit }) => {
  return (
    <StatusBar>
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
