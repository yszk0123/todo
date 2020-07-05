import * as Types from '../../__generated__/baseTypes';

import gql from 'graphql-tag';

export type RootCheckpointFragment = (
  { __typename?: 'Checkpoint' }
  & Pick<Types.Checkpoint, 'id' | 'name' | 'endAt'>
);

export const RootCheckpointFragmentDoc = gql`
    fragment RootCheckpoint on Checkpoint {
  id
  name
  endAt
}
    `;