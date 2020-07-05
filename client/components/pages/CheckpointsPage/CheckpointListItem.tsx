import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { DateTimeText } from '../../layout/DateTimeText';
import { ListItem } from '../../layout/List';

export const CheckpointListItem: React.FunctionComponent<{
  isActive: boolean;
  checkpoint: RootCheckpointFragment;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ isActive, checkpoint, onClick }) => {
  return (
    <ListItem
      isActive={isActive}
      item={checkpoint}
      mainElement={checkpoint.name ?? ''}
      rightElement={<DateTimeText value={checkpoint.endAt} />}
      onClick={onClick}
    />
  );
};
