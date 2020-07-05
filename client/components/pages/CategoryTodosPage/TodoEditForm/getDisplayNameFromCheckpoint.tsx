import { RootCheckpointFragment } from '../../../../graphql/fragments/__generated__/RootCheckpoint.graphql';

export function getDisplayNameFromCheckpoint(
  checkpoint: RootCheckpointFragment
): string {
  return checkpoint.name ?? '';
}
