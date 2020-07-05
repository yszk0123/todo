import React from 'react';

import { StatusBar, StatusBarItemType } from '../../layout/StatusBar';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
}> = ({ count }) => {
  return (
    <StatusBar
      right={[
        { type: StatusBarItemType.TEXT, content: `${count} checkpoints` },
      ]}
    />
  );
};
