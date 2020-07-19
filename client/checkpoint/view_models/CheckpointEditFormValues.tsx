import { DateTime } from '../../view_models/DateTime';
import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';

export type CheckpointEditFormValues = {
  endAt: DateTime | null;
  name: string;
};

export function getCheckpointEditFormValues(
  checkpoint: RootCheckpointFragment
): CheckpointEditFormValues {
  return {
    endAt: checkpoint.endAt,
    name: checkpoint.name ?? '',
  };
}
