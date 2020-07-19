import React from 'react';

import { ListItem, ListText } from '../../shared/components/List';
import { RelativeDateTimeText } from '../../shared/components/RelativeDateTimeText';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { CheckpointListIcon } from './CheckpointListIcon';
import { CheckpointListLink } from './CheckpointListLink';

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
        <CheckpointListIcon
          checkpoint={checkpoint}
          isSelected={isSelected}
          isSelectMode={isSelectMode}
          onClick={onClickCheckbox}
        />
      }
      mainElement={
        <ListText
          subElement={
            <RelativeDateTimeText now={now} value={checkpoint.endAt} />
          }
        >
          {checkpoint.name ?? ''}
        </ListText>
      }
      rightElement={<CheckpointListLink checkpoint={checkpoint} />}
      onClick={onClick}
    />
  );
};
