import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { CheckpointListItem } from './CheckpointListItem';

export const CheckpointList: React.FunctionComponent<{
  checkpoints: RootCheckpointFragment[];
  currentCheckpointId: ID | null;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ checkpoints, currentCheckpointId, onClick }) => {
  return (
    <List>
      {checkpoints.map((checkpoint) => {
        return (
          <CheckpointListItem
            checkpoint={checkpoint}
            isActive={checkpoint.id === currentCheckpointId}
            key={checkpoint.id}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
