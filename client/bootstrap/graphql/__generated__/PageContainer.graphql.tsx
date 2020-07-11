import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type PageContainerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PageContainerQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name' | 'avatarUrl'>
  )> }
);


export const PageContainerDocument = gql`
    query PageContainer {
  me {
    id
    name
    avatarUrl
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
export function usePageContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PageContainerQuery, PageContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<PageContainerQuery, PageContainerQueryVariables>(PageContainerDocument, baseOptions);
      }
export function usePageContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PageContainerQuery, PageContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PageContainerQuery, PageContainerQueryVariables>(PageContainerDocument, baseOptions);
        }
export type PageContainerQueryHookResult = ReturnType<typeof usePageContainerQuery>;
export type PageContainerLazyQueryHookResult = ReturnType<typeof usePageContainerLazyQuery>;
export type PageContainerQueryResult = ApolloReactCommon.QueryResult<PageContainerQuery, PageContainerQueryVariables>;
export function refetchPageContainerQuery(variables?: PageContainerQueryVariables) {
      return { query: PageContainerDocument, variables: variables }
    }