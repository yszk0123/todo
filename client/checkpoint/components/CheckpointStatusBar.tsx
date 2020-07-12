import React from 'react';
import { MdPlace } from 'react-icons/md';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
}> = ({ count, onClickEdit }) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarText text={`${count} checkpoints`} />
        <StatusBarItem>
          <MdPlace />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        <StatusBarButton isPrimary label="Edit" onClick={onClickEdit} />
      </StatusBarRight>
    </StatusBar>
  );
};
