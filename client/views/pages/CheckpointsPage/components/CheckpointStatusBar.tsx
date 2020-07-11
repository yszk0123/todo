import React from 'react';
import { MdPlace } from 'react-icons/md';

import { StatusBar, StatusBarItemType } from '../../components/StatusBar';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
}> = ({ count }) => {
  return (
    <StatusBar
      right={[
        { type: StatusBarItemType.TEXT, content: `${count} checkpoints` },
        { type: StatusBarItemType.FLEX, content: <MdPlace /> },
      ]}
    />
  );
};
