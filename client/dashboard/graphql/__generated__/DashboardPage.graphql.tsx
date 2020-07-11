import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type DashboardPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )>, stats?: Types.Maybe<(
    { __typename?: 'Stats' }
    & Pick<Types.Stats, 'categoryCount' | 'checkpointCount' | 'tagCount' | 'todoCount'>
  )> }
);


export const DashboardPageDocument = gql`
    query DashboardPage {
  me {
    id
    name
  }
  stats {
    categoryCount
    checkpointCount
    tagCount
    todoCount
  }
}
    `;

/**
 * __useDashboardPageQuery__
 *
 * To run a query within a React component, call `useDashboardPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useDashboardPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<DashboardPageQuery, DashboardPageQueryVariables>) {
        return ApolloReactHooks.useQuery<DashboardPageQuery, DashboardPageQueryVariables>(DashboardPageDocument, baseOptions);
      }
export function useDashboardPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<DashboardPageQuery, DashboardPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<DashboardPageQuery, DashboardPageQueryVariables>(DashboardPageDocument, baseOptions);
        }
export type DashboardPageQueryHookResult = ReturnType<typeof useDashboardPageQuery>;
export type DashboardPageLazyQueryHookResult = ReturnType<typeof useDashboardPageLazyQuery>;
export type DashboardPageQueryResult = ApolloReactCommon.QueryResult<DashboardPageQuery, DashboardPageQueryVariables>;
export function refetchDashboardPageQuery(variables?: DashboardPageQueryVariables) {
      return { query: DashboardPageDocument, variables: variables }
    }