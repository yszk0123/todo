import React from 'react';
import { MdList } from 'react-icons/md';

import {
  StatusBar,
  StatusBarItem,
  StatusBarLeft,
  StatusBarText,
} from '../../shared/components/StatusBar';

export const CategoryStatusBar: React.FunctionComponent<{ count: number }> = ({
  count,
}) => {
  return (
    <StatusBar>
      <StatusBarLeft>
        <StatusBarText text={`${count} categories`} />
        <StatusBarItem>
          <MdList />
        </StatusBarItem>
      </StatusBarLeft>
    </StatusBar>
  );
};
