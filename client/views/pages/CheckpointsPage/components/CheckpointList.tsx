import React from 'react';

import { RootCheckpointFragment } from '../../../graphql/__generated__/Checkpoint.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../components/List';
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
  now: number;
  onClick: (checkpoint: RootCheckpointFragment) => void;
}> = ({ checkpoints, currentCheckpointId, now, onClick }) => {
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
            now={now}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
