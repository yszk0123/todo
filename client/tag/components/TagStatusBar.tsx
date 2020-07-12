import React from 'react';
import { MdLabel } from 'react-icons/md';

import {
  StatusBar,
  StatusBarItem,
  StatusBarLeft,
  StatusBarText,
} from '../../shared/components/StatusBar';

export const TagStatusBar: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarText text={`${count} tags`} />
        <StatusBarItem>
          <MdLabel />
        </StatusBarItem>
      </StatusBarLeft>
    </StatusBar>
  );
};
