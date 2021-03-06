import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type DashboardPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type DashboardPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )>, stats?: Types.Maybe<(
    { __typename?: 'Stats' }
    & Pick<Types.Stats, 'categoryCount' | 'checkpointCount' | 'tagCount' | 'todoCount'>
    & { todoCountByDate?: Types.Maybe<Array<(
      { __typename?: 'TodoCountByDate' }
      & TodoCountByDateFragment
    )>> }
  )> }
);

export type TodoCountByDateFragment = (
  { __typename?: 'TodoCountByDate' }
  & Pick<Types.TodoCountByDate, 'count' | 'date'>
);

export const TodoCountByDateFragmentDoc = gql`
    fragment TodoCountByDate on TodoCountByDate {
  count
  date
}
    `;
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
    todoCountByDate {
      ...TodoCountByDate
    }
  }
}
    ${TodoCountByDateFragmentDoc}`;

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
export function useDashboardPageQuery(baseOptions?: Apollo.QueryHookOptions<DashboardPageQuery, DashboardPageQueryVariables>) {
        return Apollo.useQuery<DashboardPageQuery, DashboardPageQueryVariables>(DashboardPageDocument, baseOptions);
      }
export function useDashboardPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPageQuery, DashboardPageQueryVariables>) {
          return Apollo.useLazyQuery<DashboardPageQuery, DashboardPageQueryVariables>(DashboardPageDocument, baseOptions);
        }
export type DashboardPageQueryHookResult = ReturnType<typeof useDashboardPageQuery>;
export type DashboardPageLazyQueryHookResult = ReturnType<typeof useDashboardPageLazyQuery>;
export type DashboardPageQueryResult = Apollo.QueryResult<DashboardPageQuery, DashboardPageQueryVariables>;
export function refetchDashboardPageQuery(variables?: DashboardPageQueryVariables) {
      return { query: DashboardPageDocument, variables: variables }
    }