import React from 'react';

import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { Badge } from '../../../shared/components/Badge';
import { EditFormSelectField } from '../../../shared/components/EditForm';
import { getDisplayNameFromCheckpoint } from './getDisplayNameFromCheckpoint';
import { getValueFromCheckpoint } from './getValueFromCheckpoint';

export function TodoSearchFormCheckpointField({
  checkpoint,
  checkpoints,
  onSelectCheckpoint,
}: {
  checkpoint: RootCheckpointFragment | null;
  checkpoints: RootCheckpointFragment[];
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}): JSX.Element {
  return (
    <EditFormSelectField
      getDisplayName={getDisplayNameFromCheckpoint}
      getValue={getValueFromCheckpoint}
      items={checkpoints}
      rightElement={!checkpoint ? <Badge text="preserved" /> : null}
      selectedItem={checkpoint}
      onChange={onSelectCheckpoint}
    />
  );
}
