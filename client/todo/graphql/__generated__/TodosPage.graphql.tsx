import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootTodoFragment, TodoTagFragment } from './Todo.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import gql from 'graphql-tag';
import { RootTodoFragmentDoc, TodoTagFragmentDoc } from './Todo.graphql';
import { RootCheckpointFragmentDoc } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { RootCategoryFragmentDoc } from '../../../category/graphql/__generated__/Category.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type TodosPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['String'];
  categoryUUID: Types.Scalars['UUID'];
}>;


export type TodosPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>, todos: Array<(
    { __typename?: 'Todo' }
    & RootTodoFragment
  )>, tags: Array<(
    { __typename?: 'Tag' }
    & TodoTagFragment
  )>, checkpoints: Array<(
    { __typename?: 'Checkpoint' }
    & RootCheckpointFragment
  )>, categories: Array<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);


export const TodosPageDocument = gql`
    query TodosPage($categoryId: String!, $categoryUUID: UUID!) {
  me {
    id
  }
  category(where: {id: $categoryId}) {
    id
    name
  }
  todos(where: {categoryId: {equals: $categoryId}, archivedAt: {equals: null}}) {
    ...RootTodo
  }
  tags(where: {categories: {some: {id: {equals: $categoryUUID}}}}) {
    ...TodoTag
  }
  checkpoints {
    ...RootCheckpoint
  }
  categories {
    ...RootCategory
  }
}
    ${RootTodoFragmentDoc}
${TodoTagFragmentDoc}
${RootCheckpointFragmentDoc}
${RootCategoryFragmentDoc}`;

/**
 * __useTodosPageQuery__
 *
 * To run a query within a React component, call `useTodosPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodosPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodosPageQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      categoryUUID: // value for 'categoryUUID'
 *   },
 * });
 */
export function useTodosPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TodosPageQuery, TodosPageQueryVariables>) {
        return ApolloReactHooks.useQuery<TodosPageQuery, TodosPageQueryVariables>(TodosPageDocument, baseOptions);
      }
export function useTodosPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TodosPageQuery, TodosPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TodosPageQuery, TodosPageQueryVariables>(TodosPageDocument, baseOptions);
        }
export type TodosPageQueryHookResult = ReturnType<typeof useTodosPageQuery>;
export type TodosPageLazyQueryHookResult = ReturnType<typeof useTodosPageLazyQuery>;
export type TodosPageQueryResult = ApolloReactCommon.QueryResult<TodosPageQuery, TodosPageQueryVariables>;
export function refetchTodosPageQuery(variables?: TodosPageQueryVariables) {
      return { query: TodosPageDocument, variables: variables }
    }