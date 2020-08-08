import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type PageContainerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PageContainerQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'image'>
  )> }
);


export const PageContainerDocument = gql`
    query PageContainer {
  me {
    id
    name
    image
  }
}
    `;

/**
 * __usePageContainerQuery__
 *
 * To run a query within a React component, call `usePageContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `usePageContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePageContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function usePageContainerQuery(baseOptions?: Apollo.QueryHookOptions<PageContainerQuery, PageContainerQueryVariables>) {
        return Apollo.useQuery<PageContainerQuery, PageContainerQueryVariables>(PageContainerDocument, baseOptions);
      }
export function usePageContainerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PageContainerQuery, PageContainerQueryVariables>) {
          return Apollo.useLazyQuery<PageContainerQuery, PageContainerQueryVariables>(PageContainerDocument, baseOptions);
        }
export type PageContainerQueryHookResult = ReturnType<typeof usePageContainerQuery>;
export type PageContainerLazyQueryHookResult = ReturnType<typeof usePageContainerLazyQuery>;
export type PageContainerQueryResult = Apollo.QueryResult<PageContainerQuery, PageContainerQueryVariables>;
export function refetchPageContainerQuery(variables?: PageContainerQueryVariables) {
      return { query: PageContainerDocument, variables: variables }
    }