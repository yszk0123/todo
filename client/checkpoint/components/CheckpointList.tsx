import React from 'react';

import { List } from '../../shared/components/List';
import { ID } from '../../view_models/ID';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
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
  now: number;
  onClick: (checkpoint: RootCheckpointFragment) => void;
  onClickCheckbox: (checkpoint: RootCheckpointFragment) => void;
  selectedCheckpointIds: ID[];
}> = ({
  checkpoints,
  now,
  onClick,
  onClickCheckbox,
  selectedCheckpointIds,
}) => {
  const isSelectMode = selectedCheckpointIds.length > 0;
  const sortedCheckpoints = React.useMemo(() => sortCheckpoints(checkpoints), [
    checkpoints,
  ]);

  return (
    <List>
      {sortedCheckpoints.map((checkpoint) => {
        const isSelected = selectedCheckpointIds.includes(checkpoint.id);

        return (
          <CheckpointListItem
            checkpoint={checkpoint}
            isSelected={isSelected}
            isSelectMode={isSelectMode}
            key={checkpoint.id}
            now={now}
            onClick={onClick}
            onClickCheckbox={onClickCheckbox}
          />
        );
      })}
    </List>
  );
};
