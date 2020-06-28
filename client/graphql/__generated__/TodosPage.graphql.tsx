import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type TodosPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
}>;


export type TodosPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, category?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
    & { todos: Array<(
      { __typename?: 'Todo' }
      & Pick<Types.Todo, 'id' | 'text'>
      & { tags: Array<(
        { __typename?: 'Tag' }
        & Pick<Types.Tag, 'id' | 'name'>
      )> }
    )> }
  )> }
);

export type CreateOneTodoMutationVariables = Types.Exact<{
  input: Types.TodoCreateInput;
}>;


export type CreateOneTodoMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & Pick<Types.Todo, 'id' | 'text'>
    & { tags: Array<(
      { __typename?: 'Tag' }
      & Pick<Types.Tag, 'id' | 'name'>
    )> }
  ) }
);

export type DeleteTodoMutationVariables = Types.Exact<{
  input: Types.DeleteTodoInput;
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo?: Types.Maybe<(
    { __typename?: 'Todo' }
    & Pick<Types.Todo, 'id'>
  )> }
);

export type UpdateTodoMutationVariables = Types.Exact<{
  input: Types.UpdateTodoInput;
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo?: Types.Maybe<(
    { __typename?: 'Todo' }
    & Pick<Types.Todo, 'id' | 'text'>
  )> }
);


export const TodosPageDocument = gql`
    query TodosPage($categoryId: Int!) {
  me {
    id
  }
  category(id: $categoryId) {
    id
    name
    todos {
      id
      text
      tags {
        id
        name
      }
    }
  }
}
    `;

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
export const CreateOneTodoDocument = gql`
    mutation CreateOneTodo($input: TodoCreateInput!) {
  createOneTodo(data: $input) {
    id
    text
    tags {
      id
      name
    }
  }
}
    `;
export type CreateOneTodoMutationFn = ApolloReactCommon.MutationFunction<CreateOneTodoMutation, CreateOneTodoMutationVariables>;

/**
 * __useCreateOneTodoMutation__
 *
 * To run a mutation, you first call `useCreateOneTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneTodoMutation, { data, loading, error }] = useCreateOneTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOneTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneTodoMutation, CreateOneTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOneTodoMutation, CreateOneTodoMutationVariables>(CreateOneTodoDocument, baseOptions);
      }
export type CreateOneTodoMutationHookResult = ReturnType<typeof useCreateOneTodoMutation>;
export type CreateOneTodoMutationResult = ApolloReactCommon.MutationResult<CreateOneTodoMutation>;
export type CreateOneTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneTodoMutation, CreateOneTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(data: $input) {
    id
  }
}
    `;
export type DeleteTodoMutationFn = ApolloReactCommon.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, baseOptions);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = ApolloReactCommon.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(data: $input) {
    id
    text
  }
}
    `;
export type UpdateTodoMutationFn = ApolloReactCommon.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = ApolloReactCommon.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;