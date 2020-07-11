import { RootCheckpointFragment } from '../graphql/__generated__/Checkpoint.graphql';
import { toDateTime } from './DateTime';

// FIXME
export const DUMMY_CHECKPOINT: RootCheckpointFragment = {
  id: '__DUMMY__',
  name: 'RESET',
  endAt: toDateTime('2000-01-01'),
};
