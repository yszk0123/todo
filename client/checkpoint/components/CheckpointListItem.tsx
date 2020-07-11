import React from 'react';

import { ListItem } from '../../shared/components/List';
import { RelativeDateTimeText } from '../../shared/components/RelativeDateTimeText';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';

export const CheckpointListItem: React.FunctionComponent<{
  checkpoint: RootCheckpointFragment;
  isActive: boolean;
  now: number;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ checkpoint, isActive, now, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={checkpoint}
      mainElement={checkpoint.name ?? ''}
      rightElement={<RelativeDateTimeText now={now} value={checkpoint.endAt} />}
      onClick={onClick}
    />
  );
};
