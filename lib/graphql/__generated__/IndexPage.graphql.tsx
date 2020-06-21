import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type IndexPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IndexPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id' | 'name'>
  )> }
);


export const IndexPageDocument = gql`
    query IndexPage {
  me {
    id
    name
  }
}
    `;

/**
 * __useIndexPageQuery__
 *
 * To run a query within a React component, call `useIndexPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useIndexPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIndexPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useIndexPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IndexPageQuery, IndexPageQueryVariables>) {
        return ApolloReactHooks.useQuery<IndexPageQuery, IndexPageQueryVariables>(IndexPageDocument, baseOptions);
      }
export function useIndexPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IndexPageQuery, IndexPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<IndexPageQuery, IndexPageQueryVariables>(IndexPageDocument, baseOptions);
        }
export type IndexPageQueryHookResult = ReturnType<typeof useIndexPageQuery>;
export type IndexPageLazyQueryHookResult = ReturnType<typeof useIndexPageLazyQuery>;
export type IndexPageQueryResult = ApolloReactCommon.QueryResult<IndexPageQuery, IndexPageQueryVariables>;
export function refetchIndexPageQuery(variables?: IndexPageQueryVariables) {
      return { query: IndexPageDocument, variables: variables }
    }