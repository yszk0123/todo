import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootTagForReportFragment } from './TagForReport.graphql';
import gql from 'graphql-tag';
import { RootTagForReportFragmentDoc } from './TagForReport.graphql';

export type RootTodoForReportFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'status'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & RootTagForReportFragment
  )> }
);

export const RootTodoForReportFragmentDoc = gql`
    fragment RootTodoForReport on Todo {
  id
  text
  tags {
    ...RootTagForReport
  }
  status
}
    ${RootTagForReportFragmentDoc}`;