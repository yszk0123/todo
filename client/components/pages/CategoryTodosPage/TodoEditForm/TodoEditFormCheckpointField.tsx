import React from 'react';

import { RootCheckpointFragment } from '../../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { Badge } from '../../../layout/Badge';
import { EditFormSelectField } from '../../../layout/EditForm';
import { getDisplayNameFromCheckpoint } from './getDisplayNameFromCheckpoint';
import { getValueFromCheckpoint } from './getValueFromCheckpoint';

export function TodoEditFormCheckpointField({
  checkpoints,
  checkpoint,
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
