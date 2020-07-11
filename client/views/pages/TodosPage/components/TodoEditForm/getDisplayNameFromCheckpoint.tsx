import { RootCheckpointFragment } from '../../../../../graphql/__generated__/Checkpoint.graphql';

export function getDisplayNameFromCheckpoint(
  checkpoint: RootCheckpointFragment
): string {
  return checkpoint.name ?? '';
}
