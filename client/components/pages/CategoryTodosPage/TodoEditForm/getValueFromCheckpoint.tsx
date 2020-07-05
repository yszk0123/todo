import { RootCheckpointFragment } from '../../../../graphql/fragments/__generated__/RootCheckpoint.graphql';

export function getValueFromCheckpoint(
  checkpoint: RootCheckpointFragment
): string {
  return checkpoint.id;
}
