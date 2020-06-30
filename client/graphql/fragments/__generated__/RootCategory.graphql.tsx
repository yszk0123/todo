import * as Types from '../../__generated__/baseTypes';

import gql from 'graphql-tag';

export type RootCategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Types.Category, 'id' | 'name'>
);

export const RootCategoryFragmentDoc = gql`
    fragment RootCategory on Category {
  id
  name
}
    `;