import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootTodoForReportFragment } from './TodoForReport.graphql';
import { gql } from '@apollo/client';
import { RootTodoForReportFragmentDoc } from './TodoForReport.graphql';
import * as Apollo from '@apollo/client';
export type TodosReportPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['String'];
}>;


export type TodosReportPageQuery = (
  { __typename?: 'Query' }
  & { category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>, todos: Array<(
    { __typename?: 'Todo' }
    & RootTodoForReportFragment
  )> }
);


export const TodosReportPageDocument = gql`
    query TodosReportPage($categoryId: String!) {
  category(where: {id: $categoryId}) {
    id
    name
  }
  todos(where: {categoryId: {equals: $categoryId}, archivedAt: {equals: null}}) {
    ...RootTodoForReport
  }
}
    ${RootTodoForReportFragmentDoc}`;

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
 *   },
 * });
 */
export function useTodosReportPageQuery(baseOptions?: Apollo.QueryHookOptions<TodosReportPageQuery, TodosReportPageQueryVariables>) {
        return Apollo.useQuery<TodosReportPageQuery, TodosReportPageQueryVariables>(TodosReportPageDocument, baseOptions);
      }
export function useTodosReportPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosReportPageQuery, TodosReportPageQueryVariables>) {
          return Apollo.useLazyQuery<TodosReportPageQuery, TodosReportPageQueryVariables>(TodosReportPageDocument, baseOptions);
        }
export type TodosReportPageQueryHookResult = ReturnType<typeof useTodosReportPageQuery>;
export type TodosReportPageLazyQueryHookResult = ReturnType<typeof useTodosReportPageLazyQuery>;
export type TodosReportPageQueryResult = Apollo.QueryResult<TodosReportPageQuery, TodosReportPageQueryVariables>;
export function refetchTodosReportPageQuery(variables?: TodosReportPageQueryVariables) {
      return { query: TodosReportPageDocument, variables: variables }
    }