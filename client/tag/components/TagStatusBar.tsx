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
import { TagIcon } from './TagIcon';

export const TagStatusBar: React.FunctionComponent<{
  count: number;
  onClickEdit: () => void;
  selectMode: SelectMode;
}> = ({ count, onClickEdit, selectMode }) => {
  const selected = isSelected(selectMode);

  return (
    <StatusBar>
      <StatusBarPrimaryRow isSelected={selected}>
        <StatusBarLeft>
          <StatusBarText text={`${count} tags`} />
          <StatusBarItem>
            <TagIcon />
          </StatusBarItem>
        </StatusBarLeft>
        <StatusBarRight>
          <StatusBarButton
            isPrimary
            label={selected ? 'Edit' : 'Create'}
            onClick={onClickEdit}
          />
        </StatusBarRight>
      </StatusBarPrimaryRow>
    </StatusBar>
  );
};
