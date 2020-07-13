import React from 'react';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CheckpointIcon } from './CheckpointIcon';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
  selectMode: SelectMode;
}> = ({ count, onClickEdit, selectMode }) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar isSelected={selected}>
      <StatusBarLeft>
        <StatusBarText text={`${count} checkpoints`} />
        <StatusBarItem>
          <CheckpointIcon />
        </StatusBarItem>
      </StatusBarLeft>
      <StatusBarRight>
        <StatusBarButton
          isPrimary
          label={selected ? 'Edit' : 'Create'}
          onClick={onClickEdit}
        />
      </StatusBarRight>
    </StatusBar>
  );
};
