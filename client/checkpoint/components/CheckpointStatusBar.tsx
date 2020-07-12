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
import { isSelected, SelectMode } from '../../view_models/SelectMode';

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
          <MdPlace />
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
