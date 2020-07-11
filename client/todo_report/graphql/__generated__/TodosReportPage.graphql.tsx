import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootTodoForReportFragment } from './TodoForReport.graphql';
import { RootTagForReportFragment } from './TagForReport.graphql';
import gql from 'graphql-tag';
import { RootTodoForReportFragmentDoc } from './TodoForReport.graphql';
import { RootTagForReportFragmentDoc } from './TagForReport.graphql';
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
    & RootTodoForReportFragment
  )>, tags: Array<(
    { __typename?: 'Tag' }
    & RootTagForReportFragment
  )> }
);


export const TodosReportPageDocument = gql`
    query TodosReportPage($categoryId: String!, $categoryUUID: UUID!) {
  category(where: {id: $categoryId}) {
    id
    name
  }
  todos(where: {categoryId: {equals: $categoryId}, archivedAt: {equals: null}}) {
    ...RootTodoForReport
  }
  tags(where: {categories: {some: {id: {equals: $categoryUUID}}}}) {
    ...RootTagForReport
  }
}
    ${RootTodoForReportFragmentDoc}
${RootTagForReportFragmentDoc}`;

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