import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { RootTodoFragment, TodoTagFragment } from './Todo.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { gql } from '@apollo/client';
import { RootTodoFragmentDoc, TodoTagFragmentDoc } from './Todo.graphql';
import { RootCheckpointFragmentDoc } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { RootCategoryFragmentDoc } from '../../../category/graphql/__generated__/Category.graphql';
import * as Apollo from '@apollo/client';
export type TodosPageQueryVariables = Types.Exact<{
  todoInput: Types.TodoWhereInput;
  tagInput: Types.TagWhereInput;
}>;


export type TodosPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
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
    query TodosPage($todoInput: TodoWhereInput!, $tagInput: TagWhereInput!) {
  me {
    id
  }
  todos(where: $todoInput) {
    ...RootTodo
  }
  tags(where: $tagInput) {
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
 *      todoInput: // value for 'todoInput'
 *      tagInput: // value for 'tagInput'
 *   },
 * });
 */
export function useTodosPageQuery(baseOptions?: Apollo.QueryHookOptions<TodosPageQuery, TodosPageQueryVariables>) {
        return Apollo.useQuery<TodosPageQuery, TodosPageQueryVariables>(TodosPageDocument, baseOptions);
      }
export function useTodosPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodosPageQuery, TodosPageQueryVariables>) {
          return Apollo.useLazyQuery<TodosPageQuery, TodosPageQueryVariables>(TodosPageDocument, baseOptions);
        }
export type TodosPageQueryHookResult = ReturnType<typeof useTodosPageQuery>;
export type TodosPageLazyQueryHookResult = ReturnType<typeof useTodosPageLazyQuery>;
export type TodosPageQueryResult = Apollo.QueryResult<TodosPageQuery, TodosPageQueryVariables>;
export function refetchTodosPageQuery(variables?: TodosPageQueryVariables) {
      return { query: TodosPageDocument, variables: variables }
    }