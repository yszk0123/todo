import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import gql from 'graphql-tag';
import { RootCategoryFragmentDoc } from '../../../category/graphql/__generated__/Category.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type SideNavigationContainerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SideNavigationContainerQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);


export const SideNavigationContainerDocument = gql`
    query SideNavigationContainer {
  categories {
    ...RootCategory
  }
}
    ${RootCategoryFragmentDoc}`;

/**
 * __useSideNavigationContainerQuery__
 *
 * To run a query within a React component, call `useSideNavigationContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useSideNavigationContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSideNavigationContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function useSideNavigationContainerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SideNavigationContainerQuery, SideNavigationContainerQueryVariables>) {
        return ApolloReactHooks.useQuery<SideNavigationContainerQuery, SideNavigationContainerQueryVariables>(SideNavigationContainerDocument, baseOptions);
      }
export function useSideNavigationContainerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SideNavigationContainerQuery, SideNavigationContainerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SideNavigationContainerQuery, SideNavigationContainerQueryVariables>(SideNavigationContainerDocument, baseOptions);
        }
export type SideNavigationContainerQueryHookResult = ReturnType<typeof useSideNavigationContainerQuery>;
export type SideNavigationContainerLazyQueryHookResult = ReturnType<typeof useSideNavigationContainerLazyQuery>;
export type SideNavigationContainerQueryResult = ApolloReactCommon.QueryResult<SideNavigationContainerQuery, SideNavigationContainerQueryVariables>;
export function refetchSideNavigationContainerQuery(variables?: SideNavigationContainerQueryVariables) {
      return { query: SideNavigationContainerDocument, variables: variables }
    }