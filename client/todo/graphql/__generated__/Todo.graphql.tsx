import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type GetTodosQueryVariables = Types.Exact<{
  input: Types.TodoWhereInput;
}>;


export type GetTodosQuery = (
  { __typename?: 'Query' }
  & { todos: Array<(
    { __typename?: 'Todo' }
    & RootTodoFragment
  )> }
);

export type CreateOneTodoMutationVariables = Types.Exact<{
  input: Types.TodoCreateInput;
}>;


export type CreateOneTodoMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & RootTodoFragment
  ) }
);

export type DeleteTodoMutationVariables = Types.Exact<{
  input: Types.DeleteTodoInput;
}>;


export type DeleteTodoMutation = (
  { __typename?: 'Mutation' }
  & { deleteTodo?: Types.Maybe<(
    { __typename?: 'Todo' }
    & Pick<Types.Todo, 'id' | 'categoryId'>
  )> }
);

export type UpdateTodoMutationVariables = Types.Exact<{
  input: Types.UpdateTodoInput;
}>;


export type UpdateTodoMutation = (
  { __typename?: 'Mutation' }
  & { updateTodo?: Types.Maybe<(
    { __typename?: 'Todo' }
    & RootTodoFragment
  )> }
);

export type DeleteTodosByIdMutationVariables = Types.Exact<{
  input: Types.DeleteTodosByIdInput;
}>;


export type DeleteTodosByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'deleteTodosById'>
);

export type UpdateTodosByIdMutationVariables = Types.Exact<{
  input: Types.UpdateTodosByIdInput;
}>;


export type UpdateTodosByIdMutation = (
  { __typename?: 'Mutation' }
  & { updateTodosById?: Types.Maybe<Array<(
    { __typename?: 'Todo' }
    & RootTodoFragment
  )>> }
);

export type RootTodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'categoryId' | 'status' | 'archivedAt'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & TodoTagFragment
  )>, category: (
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  ), checkpoint?: Types.Maybe<(
    { __typename?: 'Checkpoint' }
    & Pick<Types.Checkpoint, 'id' | 'name' | 'endAt'>
  )> }
);

export type TodoTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name' | 'color'>
);

export const TodoTagFragmentDoc = gql`
    fragment TodoTag on Tag {
  id
  name
  color
}
    `;
export const RootTodoFragmentDoc = gql`
    fragment RootTodo on Todo {
  id
  text
  categoryId
  tags {
    ...TodoTag
  }
  status
  archivedAt
  category {
    id
    name
  }
  checkpoint {
    id
    name
    endAt
  }
}
    ${TodoTagFragmentDoc}`;
export const GetTodosDocument = gql`
    query GetTodos($input: TodoWhereInput!) {
  todos(where: $input) {
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTodosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        return ApolloReactHooks.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
      }
export function useGetTodosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = ApolloReactCommon.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
export function refetchGetTodosQuery(variables?: GetTodosQueryVariables) {
      return { query: GetTodosDocument, variables: variables }
    }
export const CreateOneTodoDocument = gql`
    mutation CreateOneTodo($input: TodoCreateInput!) {
  createOneTodo(data: $input) {
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;
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
    categoryId
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
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;
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
export const DeleteTodosByIdDocument = gql`
    mutation DeleteTodosById($input: DeleteTodosByIdInput!) {
  deleteTodosById(data: $input)
}
    `;
export type DeleteTodosByIdMutationFn = ApolloReactCommon.MutationFunction<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>;

/**
 * __useDeleteTodosByIdMutation__
 *
 * To run a mutation, you first call `useDeleteTodosByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodosByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodosByIdMutation, { data, loading, error }] = useDeleteTodosByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTodosByIdMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>(DeleteTodosByIdDocument, baseOptions);
      }
export type DeleteTodosByIdMutationHookResult = ReturnType<typeof useDeleteTodosByIdMutation>;
export type DeleteTodosByIdMutationResult = ApolloReactCommon.MutationResult<DeleteTodosByIdMutation>;
export type DeleteTodosByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>;
export const UpdateTodosByIdDocument = gql`
    mutation UpdateTodosById($input: UpdateTodosByIdInput!) {
  updateTodosById(data: $input) {
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;
export type UpdateTodosByIdMutationFn = ApolloReactCommon.MutationFunction<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>;

/**
 * __useUpdateTodosByIdMutation__
 *
 * To run a mutation, you first call `useUpdateTodosByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodosByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodosByIdMutation, { data, loading, error }] = useUpdateTodosByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTodosByIdMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>(UpdateTodosByIdDocument, baseOptions);
      }
export type UpdateTodosByIdMutationHookResult = ReturnType<typeof useUpdateTodosByIdMutation>;
export type UpdateTodosByIdMutationResult = ApolloReactCommon.MutationResult<UpdateTodosByIdMutation>;
export type UpdateTodosByIdMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>;