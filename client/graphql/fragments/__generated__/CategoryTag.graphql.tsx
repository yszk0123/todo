import * as Types from '../../__generated__/baseTypes';

import gql from 'graphql-tag';

export type CategoryTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name'>
);

export const CategoryTagFragmentDoc = gql`
    fragment CategoryTag on Tag {
  id
  name
}
    `;