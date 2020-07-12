import React from 'react';
import { MdLabel } from 'react-icons/md';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';

export const TagStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
}> = ({ count, onClickEdit }) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarText text={`${count} tags`} />
        <StatusBarItem>
          <MdLabel />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        <StatusBarButton isPrimary label="Edit" onClick={onClickEdit} />
      </StatusBarRight>
    </StatusBar>
  );
};
