import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { gql } from '@apollo/client';
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