import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { CheckpointListItem } from './CheckpointListItem';

function sortCheckpoints(
  checkpoints: RootCheckpointFragment[]
): RootCheckpointFragment[] {
  return [...checkpoints].sort((a, b) => {
    const d1 = +new Date(a.endAt);
    const d2 = +new Date(b.endAt);
    return d1 - d2;
  });
}

export const CheckpointList: React.FunctionComponent<{
  checkpoints: RootCheckpointFragment[];
  currentCheckpointId: ID | null;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ checkpoints, currentCheckpointId, onClick }) => {
  const sortedCheckpoints = React.useMemo(() => sortCheckpoints(checkpoints), [
    checkpoints,
  ]);

  return (
    <List>
      {sortedCheckpoints.map((checkpoint) => {
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
