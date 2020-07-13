import React from 'react';

import { ListCheckbox, ListItem } from '../../shared/components/List';
import { RelativeDateTimeText } from '../../shared/components/RelativeDateTimeText';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { CheckpointListIcon } from './CheckpointListIcon';

export const CheckpointListItem: React.FunctionComponent<{
  checkpoint: RootCheckpointFragment;
  isSelectMode: boolean;
  isSelected: boolean;
  now: number;
  onClick: (checkpoint: RootCheckpointFragment) => void;
  onClickCheckbox: (checkpoint: RootCheckpointFragment) => void;
}> = ({
  checkpoint,
  isSelectMode,
  isSelected,
  now,
  onClick,
  onClickCheckbox,
}) => {
  return (
    <ListItem
      isActive={isSelected}
      item={checkpoint}
      leftElement={
        isSelectMode ? (
          <ListCheckbox
            isSelected={isSelected}
            item={checkpoint}
            onClick={onClickCheckbox}
          />
        ) : (
          <CheckpointListIcon />
        )
      }
      mainElement={checkpoint.name ?? ''}
      rightElement={<RelativeDateTimeText now={now} value={checkpoint.endAt} />}
      onClick={onClick}
    />
  );
};
