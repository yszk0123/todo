import * as Types from './baseTypes';

import { RootCheckpointFragment } from './Checkpoint.graphql';
import gql from 'graphql-tag';
import { RootCheckpointFragmentDoc } from './Checkpoint.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CheckpointsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CheckpointsPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, checkpoints: Array<(
    { __typename?: 'Checkpoint' }
    & RootCheckpointFragment
  )> }
);


export const CheckpointsPageDocument = gql`
    query CheckpointsPage {
  me {
    id
  }
  checkpoints {
    ...RootCheckpoint
  }
}
    ${RootCheckpointFragmentDoc}`;

/**
 * __useCheckpointsPageQuery__
 *
 * To run a query within a React component, call `useCheckpointsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckpointsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckpointsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckpointsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CheckpointsPageQuery, CheckpointsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<CheckpointsPageQuery, CheckpointsPageQueryVariables>(CheckpointsPageDocument, baseOptions);
      }
export function useCheckpointsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CheckpointsPageQuery, CheckpointsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CheckpointsPageQuery, CheckpointsPageQueryVariables>(CheckpointsPageDocument, baseOptions);
        }
export type CheckpointsPageQueryHookResult = ReturnType<typeof useCheckpointsPageQuery>;
export type CheckpointsPageLazyQueryHookResult = ReturnType<typeof useCheckpointsPageLazyQuery>;
export type CheckpointsPageQueryResult = ApolloReactCommon.QueryResult<CheckpointsPageQuery, CheckpointsPageQueryVariables>;
export function refetchCheckpointsPageQuery(variables?: CheckpointsPageQueryVariables) {
      return { query: CheckpointsPageDocument, variables: variables }
    }