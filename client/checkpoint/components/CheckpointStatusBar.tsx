import React from 'react';
import { MdPlace } from 'react-icons/md';

import {
  StatusBar,
  StatusBarItem,
  StatusBarLeft,
  StatusBarText,
} from '../../shared/components/StatusBar';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
}> = ({ count }) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarText text={`${count} checkpoints`} />
        <StatusBarItem>
          <MdPlace />
        </StatusBarItem>
      </StatusBarLeft>
    </StatusBar>
  );
};
