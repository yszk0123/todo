import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type TodosReportPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['String'];
  categoryUUID: Types.Scalars['UUID'];
}>;


export type TodosReportPageQuery = (
  { __typename?: 'Query' }
  & { category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>, todos: Array<(
    { __typename?: 'Todo' }
    & TodosReportPageTodoFragment
  )>, tags: Array<(
    { __typename?: 'Tag' }
    & TodosReportPageTagFragment
  )> }
);

export type TodosReportPageTodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'status'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & TodosReportPageTagFragment
  )> }
);

export type TodosReportPageTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name'>
);

export const TodosReportPageTagFragmentDoc = gql`
    fragment TodosReportPageTag on Tag {
  id
  name
}
    `;
export const TodosReportPageTodoFragmentDoc = gql`
    fragment TodosReportPageTodo on Todo {
  id
  text
  tags {
    ...TodosReportPageTag
  }
  status
}
    ${TodosReportPageTagFragmentDoc}`;
export const TodosReportPageDocument = gql`
    query TodosReportPage($categoryId: String!, $categoryUUID: UUID!) {
  category(where: {id: $categoryId}) {
    id
    name
  }
  todos(where: {categoryId: {equals: $categoryId}, archivedAt: {equals: null}}) {
    ...TodosReportPageTodo
  }
  tags(where: {categories: {some: {id: {equals: $categoryUUID}}}}) {
    ...TodosReportPageTag
  }
}
    ${TodosReportPageTodoFragmentDoc}
${TodosReportPageTagFragmentDoc}`;

/**
 * __useTodosReportPageQuery__
 *
 * To run a query within a React component, call `useTodosReportPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosReportPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosReportPageQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      categoryUUID: // value for 'categoryUUID'
 *   },
 * });
 */
export function useTodosReportPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TodosReportPageQuery, TodosReportPageQueryVariables>) {
        return ApolloReactHooks.useQuery<TodosReportPageQuery, TodosReportPageQueryVariables>(TodosReportPageDocument, baseOptions);
      }
export function useTodosReportPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodosReportPageQuery, TodosReportPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TodosReportPageQuery, TodosReportPageQueryVariables>(TodosReportPageDocument, baseOptions);
        }
export type TodosReportPageQueryHookResult = ReturnType<typeof useTodosReportPageQuery>;
export type TodosReportPageLazyQueryHookResult = ReturnType<typeof useTodosReportPageLazyQuery>;
export type TodosReportPageQueryResult = ApolloReactCommon.QueryResult<TodosReportPageQuery, TodosReportPageQueryVariables>;
export function refetchTodosReportPageQuery(variables?: TodosReportPageQueryVariables) {
      return { query: TodosReportPageDocument, variables: variables }
    }