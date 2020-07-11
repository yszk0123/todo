import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type GetPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPageQuery = (
  { __typename?: 'Query' }
  & { page?: Types.Maybe<(
    { __typename?: 'Page' }
    & RootPageFragment
  )> }
);

export type RootPageFragment = (
  { __typename?: 'Page' }
  & Pick<Types.Page, 'isSyncing'>
);

export const RootPageFragmentDoc = gql`
    fragment RootPage on Page {
  isSyncing
}
    `;
export const GetPageDocument = gql`
    query GetPage {
  page @client {
    ...RootPage
  }
}
    ${RootPageFragmentDoc}`;

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, baseOptions);
      }
export function useGetPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, baseOptions);
        }
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>;
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>;
export type GetPageQueryResult = ApolloReactCommon.QueryResult<GetPageQuery, GetPageQueryVariables>;
export function refetchGetPageQuery(variables?: GetPageQueryVariables) {
      return { query: GetPageDocument, variables: variables }
    }