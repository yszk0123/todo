import React from 'react';

import {
  StatusBar,
  StatusBarButton,
  StatusBarItem,
  StatusBarLeft,
  StatusBarPrimaryRow,
  StatusBarRight,
  StatusBarText,
} from '../../shared/components/StatusBar';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CheckpointIcon } from './CheckpointIcon';

export const CheckpointStatusBar: React.FunctionComponent<{
  count: number;
  onClickArchive: () => void;
  onClickEdit: () => void;
  selectMode: SelectMode;
}> = ({ count, onClickArchive, onClickEdit, selectMode }) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar>
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
          <StatusBarText text={`${count} checkpoints`} />
          <StatusBarItem>
            <CheckpointIcon />
          </StatusBarItem>
        </StatusBarLeft>
        <StatusBarRight>
          {selected && (
            <StatusBarButton
              isSelected={selected}
              label="Archive"
              onClick={onClickArchive}
            />
          )}
          <StatusBarButton
            isPrimary
            isSelected={selected}
            label={selected ? 'Edit' : 'Create'}
            onClick={onClickEdit}
          />
        </StatusBarRight>
      </StatusBarPrimaryRow>
    </StatusBar>
  );
};
