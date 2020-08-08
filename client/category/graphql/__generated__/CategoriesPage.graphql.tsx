import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootCategoryFragment } from './Category.graphql';
import { gql } from '@apollo/client';
import { RootCategoryFragmentDoc } from './Category.graphql';
import * as Apollo from '@apollo/client';
export type CategoriesPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CategoriesPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, categories: Array<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);


export const CategoriesPageDocument = gql`
    query CategoriesPage {
  me {
    id
  }
  categories {
    ...RootCategory
  }
}
    ${RootCategoryFragmentDoc}`;

/**
 * __useCategoriesPageQuery__
 *
 * To run a query within a React component, call `useCategoriesPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesPageQuery(baseOptions?: Apollo.QueryHookOptions<CategoriesPageQuery, CategoriesPageQueryVariables>) {
        return Apollo.useQuery<CategoriesPageQuery, CategoriesPageQueryVariables>(CategoriesPageDocument, baseOptions);
      }
export function useCategoriesPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoriesPageQuery, CategoriesPageQueryVariables>) {
          return Apollo.useLazyQuery<CategoriesPageQuery, CategoriesPageQueryVariables>(CategoriesPageDocument, baseOptions);
        }
export type CategoriesPageQueryHookResult = ReturnType<typeof useCategoriesPageQuery>;
export type CategoriesPageLazyQueryHookResult = ReturnType<typeof useCategoriesPageLazyQuery>;
export type CategoriesPageQueryResult = Apollo.QueryResult<CategoriesPageQuery, CategoriesPageQueryVariables>;
export function refetchCategoriesPageQuery(variables?: CategoriesPageQueryVariables) {
      return { query: CategoriesPageDocument, variables: variables }
    }