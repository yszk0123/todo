import React from 'react';

import { SyncingIcon } from '../../../shared/components/SyncingIcon';
import { TodoIcon } from '../TodoIcon';

export const TodoStatusBarSyncStatus: React.FunctionComponent<{
  isSyncing: boolean;
}> = ({ isSyncing }) => {
  return isSyncing ? <SyncingIcon /> : <TodoIcon />;
};
