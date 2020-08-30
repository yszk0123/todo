import * as Types from './baseTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PageIsSyncingQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PageIsSyncingQuery = (
  { __typename?: 'Query' }
  & { page?: Types.Maybe<(
    { __typename?: 'Page' }
    & Pick<Types.Page, 'isSyncing'>
  )> }
);


export const PageIsSyncingDocument = gql`
    query PageIsSyncing {
  page @client {
    isSyncing
  }
}
    `;

/**
 * __usePageIsSyncingQuery__
 *
 * To run a query within a React component, call `usePageIsSyncingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageIsSyncingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageIsSyncingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePageIsSyncingQuery(baseOptions?: Apollo.QueryHookOptions<PageIsSyncingQuery, PageIsSyncingQueryVariables>) {
        return Apollo.useQuery<PageIsSyncingQuery, PageIsSyncingQueryVariables>(PageIsSyncingDocument, baseOptions);
      }
export function usePageIsSyncingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageIsSyncingQuery, PageIsSyncingQueryVariables>) {
          return Apollo.useLazyQuery<PageIsSyncingQuery, PageIsSyncingQueryVariables>(PageIsSyncingDocument, baseOptions);
        }
export type PageIsSyncingQueryHookResult = ReturnType<typeof usePageIsSyncingQuery>;
export type PageIsSyncingLazyQueryHookResult = ReturnType<typeof usePageIsSyncingLazyQuery>;
export type PageIsSyncingQueryResult = Apollo.QueryResult<PageIsSyncingQuery, PageIsSyncingQueryVariables>;
export function refetchPageIsSyncingQuery(variables?: PageIsSyncingQueryVariables) {
      return { query: PageIsSyncingDocument, variables: variables }
    }