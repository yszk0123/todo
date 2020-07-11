import React from 'react';

import { RootCheckpointFragment } from '../../../../graphql/__generated__/Checkpoint.graphql';
import { Badge } from '../../../layout/Badge';
import { EditFormSelectField } from '../../../layout/EditForm';
import { getDisplayNameFromCheckpoint } from './getDisplayNameFromCheckpoint';
import { getValueFromCheckpoint } from './getValueFromCheckpoint';

export function TodoEditFormCheckpointField({
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