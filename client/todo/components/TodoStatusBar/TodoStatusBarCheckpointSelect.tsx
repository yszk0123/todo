import React from 'react';

import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { LabelledSelect } from '../../../shared/components/LabelledSelect';

const getDisplayName = (checkpoint: RootCheckpointFragment, i: number) =>
  `${i}: ${checkpoint.name ?? ''}`;
const getValue = (checkpoint: RootCheckpointFragment) => checkpoint.id;

export const TodoStatusBarCheckpointSelect: React.FunctionComponent<{
  checkpoint: RootCheckpointFragment | null;
  checkpoints: RootCheckpointFragment[];
  onClickCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}> = ({ checkpoint, checkpoints, onClickCheckpoint }) => {
  return (
    <LabelledSelect
      getDisplayName={getDisplayName}
      getValue={getValue}
      id="todo-status-checkpoint"
      items={checkpoints}
      label="Checkpoint"
      selectedItem={checkpoint}
      onChange={onClickCheckpoint}
    />
  );
};
