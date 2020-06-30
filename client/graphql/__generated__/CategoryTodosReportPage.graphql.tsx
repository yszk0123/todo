import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CategoryTodosReportPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type CategoryTodosReportPageQuery = (
  { __typename?: 'Query' }
  & { category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & CategoryTodosReportPageTodoFragment
    )>, tags: Array<(
      { __typename?: 'Tag' }
      & CategoryTodosReportPageTagFragment
    )> }
  )> }
);

export type CategoryTodosReportPageTodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'status'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & CategoryTodosReportPageTagFragment
  )> }
);

export type CategoryTodosReportPageTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name'>
);

export const CategoryTodosReportPageTagFragmentDoc = gql`
    fragment CategoryTodosReportPageTag on Tag {
  id
  name
}
    `;
export const CategoryTodosReportPageTodoFragmentDoc = gql`
    fragment CategoryTodosReportPageTodo on Todo {
  id
  text
  tags {
    ...CategoryTodosReportPageTag
  }
  status
}
    ${CategoryTodosReportPageTagFragmentDoc}`;
export const CategoryTodosReportPageDocument = gql`
    query CategoryTodosReportPage($categoryId: Int!) {
  category(id: $categoryId) {
    id
    name
    todos(where: {archivedAt: {equals: null}}) {
      ...CategoryTodosReportPageTodo
    }
    tags {
      ...CategoryTodosReportPageTag
    }
  }
}
    ${CategoryTodosReportPageTodoFragmentDoc}
${CategoryTodosReportPageTagFragmentDoc}`;

/**
 * __useCategoryTodosReportPageQuery__
 *
 * To run a query within a React component, call `useCategoryTodosReportPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryTodosReportPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryTodosReportPageQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCategoryTodosReportPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoryTodosReportPageQuery, CategoryTodosReportPageQueryVariables>) {
        return ApolloReactHooks.useQuery<CategoryTodosReportPageQuery, CategoryTodosReportPageQueryVariables>(CategoryTodosReportPageDocument, baseOptions);
      }
export function useCategoryTodosReportPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoryTodosReportPageQuery, CategoryTodosReportPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CategoryTodosReportPageQuery, CategoryTodosReportPageQueryVariables>(CategoryTodosReportPageDocument, baseOptions);
        }
export type CategoryTodosReportPageQueryHookResult = ReturnType<typeof useCategoryTodosReportPageQuery>;
export type CategoryTodosReportPageLazyQueryHookResult = ReturnType<typeof useCategoryTodosReportPageLazyQuery>;
export type CategoryTodosReportPageQueryResult = ApolloReactCommon.QueryResult<CategoryTodosReportPageQuery, CategoryTodosReportPageQueryVariables>;
export function refetchCategoryTodosReportPageQuery(variables?: CategoryTodosReportPageQueryVariables) {
      return { query: CategoryTodosReportPageDocument, variables: variables }
    }