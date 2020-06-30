import * as Types from './baseTypes';

import { CategoryTodoFragment } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../fragments/__generated__/CategoryTag.graphql';
import gql from 'graphql-tag';
import { CategoryTodoFragmentDoc } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragmentDoc } from '../fragments/__generated__/CategoryTag.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CategoryTodosPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type CategoryTodosPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & CategoryTodoFragment
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & CategoryTagFragment
    )> }
  )> }
);


export const CategoryTodosPageDocument = gql`
    query CategoryTodosPage($categoryId: Int!) {
  me {
    id
  }
  category(id: $categoryId) {
    id
    name
    todos(where: {archivedAt: {equals: null}}) {
      ...CategoryTodo
    }
    tags {
      ...CategoryTag
    }
  }
}
    ${CategoryTodoFragmentDoc}
${CategoryTagFragmentDoc}`;

/**
 * __useCategoryTodosPageQuery__
 *
 * To run a query within a React component, call `useCategoryTodosPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTodosPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTodosPageQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryTodosPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryTodosPageQuery, CategoryTodosPageQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryTodosPageQuery, CategoryTodosPageQueryVariables>(CategoryTodosPageDocument, baseOptions);
      }
export function useCategoryTodosPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryTodosPageQuery, CategoryTodosPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryTodosPageQuery, CategoryTodosPageQueryVariables>(CategoryTodosPageDocument, baseOptions);
        }
export type CategoryTodosPageQueryHookResult = ReturnType<typeof useCategoryTodosPageQuery>;
export type CategoryTodosPageLazyQueryHookResult = ReturnType<typeof useCategoryTodosPageLazyQuery>;
export type CategoryTodosPageQueryResult = ApolloReactCommon.QueryResult<CategoryTodosPageQuery, CategoryTodosPageQueryVariables>;
export function refetchCategoryTodosPageQuery(variables?: CategoryTodosPageQueryVariables) {
      return { query: CategoryTodosPageDocument, variables: variables }
    }