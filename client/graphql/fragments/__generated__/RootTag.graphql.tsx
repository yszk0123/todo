import * as Types from '../../__generated__/baseTypes';

import gql from 'graphql-tag';

export type RootTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name'>
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )> }
);

export const RootTagFragmentDoc = gql`
    fragment RootTag on Tag {
  id
  name
  categories {
    id
    name
  }
}
    `;