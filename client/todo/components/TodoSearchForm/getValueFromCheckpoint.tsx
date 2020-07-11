import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';

export function getValueFromCheckpoint(
  checkpoint: RootCheckpointFragment
): string {
  return checkpoint.id;
}
