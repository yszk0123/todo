import React from 'react';
import { Flex } from 'rebass';

import { SyncIcon } from '../../../shared/components/SyncIcon';
import { TodoIcon } from '../TodoIcon';

const animation = {
  animationName: 'rotation',
  animationIterationCount: 'infinite',
  animationDuration: '2s',
  animationTimingFunction: 'linear',
  '@keyframes rotation': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },
} as const;

export const TodoStatusBarSyncStatus: React.FunctionComponent<{
  isSyncing: boolean;
}> = ({ isSyncing }) => {
  if (!isSyncing) {
    return <TodoIcon />;
  }

  return (
    <Flex sx={animation}>
      <SyncIcon />
    </Flex>
  );
};
