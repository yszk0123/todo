import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { ListItem } from '../../layout/List';
import { RelativeDateTimeText } from '../../layout/RelativeDateTimeText';

export const CheckpointListItem: React.FunctionComponent<{
  checkpoint: RootCheckpointFragment;
  isActive: boolean;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ isActive, checkpoint, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={checkpoint}
      mainElement={checkpoint.name ?? ''}
      rightElement={<RelativeDateTimeText value={checkpoint.endAt} />}
      onClick={onClick}
    />
  );
};
