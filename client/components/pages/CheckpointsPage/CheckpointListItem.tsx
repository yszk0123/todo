import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/__generated__/Checkpoint.graphql';
import { ListItem } from '../../layout/List';
import { RelativeDateTimeText } from '../../layout/RelativeDateTimeText';

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
