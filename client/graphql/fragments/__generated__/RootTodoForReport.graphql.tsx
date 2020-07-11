import * as Types from '../../__generated__/baseTypes';

import { RootTagForReportFragment } from './RootTagForReport.graphql';
import gql from 'graphql-tag';
import { RootTagForReportFragmentDoc } from './RootTagForReport.graphql';

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