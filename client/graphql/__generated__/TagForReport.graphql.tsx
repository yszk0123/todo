import * as Types from './baseTypes';

import gql from 'graphql-tag';

export type RootTagForReportFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name'>
);

export const RootTagForReportFragmentDoc = gql`
    fragment RootTagForReport on Tag {
  id
  name
}
    `;