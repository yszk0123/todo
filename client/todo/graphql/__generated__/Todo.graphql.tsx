import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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

export type DuplicateTodosByIdMutationVariables = Types.Exact<{
  input: Types.DuplicateTodosByIdInput;
}>;


export type DuplicateTodosByIdMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'duplicateTodosById'>
);

export type RootTodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'createdAt' | 'categoryId' | 'status' | 'archivedAt'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & TodoTagFragment
  )>, category: (
    { __typename?: 'Category' }
    & TodoCategoryFragment
  ), checkpoint?: Types.Maybe<(
    { __typename?: 'Checkpoint' }
    & TodoCheckpointFragment
  )> }
);

export type TodoCheckpointFragment = (
  { __typename?: 'Checkpoint' }
  & Pick<Types.Checkpoint, 'id' | 'name' | 'endAt'>
);

export type TodoTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name' | 'color'>
);

export type TodoCategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Types.Category, 'id' | 'name'>
);

export const TodoTagFragmentDoc = gql`
    fragment TodoTag on Tag {
  id
  name
  color
}
    `;
export const TodoCategoryFragmentDoc = gql`
    fragment TodoCategory on Category {
  id
  name
}
    `;
export const TodoCheckpointFragmentDoc = gql`
    fragment TodoCheckpoint on Checkpoint {
  id
  name
  endAt
}
    `;
export const RootTodoFragmentDoc = gql`
    fragment RootTodo on Todo {
  id
  text
  createdAt
  categoryId
  tags {
    ...TodoTag
  }
  status
  archivedAt
  category {
    ...TodoCategory
  }
  checkpoint {
    ...TodoCheckpoint
  }
}
    ${TodoTagFragmentDoc}
${TodoCategoryFragmentDoc}
${TodoCheckpointFragmentDoc}`;
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
export function useGetTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
        return Apollo.useQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
      }
export function useGetTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTodosQuery, GetTodosQueryVariables>) {
          return Apollo.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(GetTodosDocument, baseOptions);
        }
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<typeof useGetTodosLazyQuery>;
export type GetTodosQueryResult = Apollo.QueryResult<GetTodosQuery, GetTodosQueryVariables>;
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
export type CreateOneTodoMutationFn = Apollo.MutationFunction<CreateOneTodoMutation, CreateOneTodoMutationVariables>;

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
export function useCreateOneTodoMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneTodoMutation, CreateOneTodoMutationVariables>) {
        return Apollo.useMutation<CreateOneTodoMutation, CreateOneTodoMutationVariables>(CreateOneTodoDocument, baseOptions);
      }
export type CreateOneTodoMutationHookResult = ReturnType<typeof useCreateOneTodoMutation>;
export type CreateOneTodoMutationResult = Apollo.MutationResult<CreateOneTodoMutation>;
export type CreateOneTodoMutationOptions = Apollo.BaseMutationOptions<CreateOneTodoMutation, CreateOneTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($input: DeleteTodoInput!) {
  deleteTodo(data: $input) {
    id
    categoryId
  }
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

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
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, baseOptions);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(data: $input) {
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

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
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, baseOptions);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const DeleteTodosByIdDocument = gql`
    mutation DeleteTodosById($input: DeleteTodosByIdInput!) {
  deleteTodosById(data: $input)
}
    `;
export type DeleteTodosByIdMutationFn = Apollo.MutationFunction<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>;

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
export function useDeleteTodosByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>) {
        return Apollo.useMutation<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>(DeleteTodosByIdDocument, baseOptions);
      }
export type DeleteTodosByIdMutationHookResult = ReturnType<typeof useDeleteTodosByIdMutation>;
export type DeleteTodosByIdMutationResult = Apollo.MutationResult<DeleteTodosByIdMutation>;
export type DeleteTodosByIdMutationOptions = Apollo.BaseMutationOptions<DeleteTodosByIdMutation, DeleteTodosByIdMutationVariables>;
export const UpdateTodosByIdDocument = gql`
    mutation UpdateTodosById($input: UpdateTodosByIdInput!) {
  updateTodosById(data: $input) {
    ...RootTodo
  }
}
    ${RootTodoFragmentDoc}`;
export type UpdateTodosByIdMutationFn = Apollo.MutationFunction<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>;

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
export function useUpdateTodosByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>) {
        return Apollo.useMutation<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>(UpdateTodosByIdDocument, baseOptions);
      }
export type UpdateTodosByIdMutationHookResult = ReturnType<typeof useUpdateTodosByIdMutation>;
export type UpdateTodosByIdMutationResult = Apollo.MutationResult<UpdateTodosByIdMutation>;
export type UpdateTodosByIdMutationOptions = Apollo.BaseMutationOptions<UpdateTodosByIdMutation, UpdateTodosByIdMutationVariables>;
export const DuplicateTodosByIdDocument = gql`
    mutation DuplicateTodosById($input: DuplicateTodosByIdInput!) {
  duplicateTodosById(data: $input)
}
    `;
export type DuplicateTodosByIdMutationFn = Apollo.MutationFunction<DuplicateTodosByIdMutation, DuplicateTodosByIdMutationVariables>;

/**
 * __useDuplicateTodosByIdMutation__
 *
 * To run a mutation, you first call `useDuplicateTodosByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDuplicateTodosByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [duplicateTodosByIdMutation, { data, loading, error }] = useDuplicateTodosByIdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDuplicateTodosByIdMutation(baseOptions?: Apollo.MutationHookOptions<DuplicateTodosByIdMutation, DuplicateTodosByIdMutationVariables>) {
        return Apollo.useMutation<DuplicateTodosByIdMutation, DuplicateTodosByIdMutationVariables>(DuplicateTodosByIdDocument, baseOptions);
      }
export type DuplicateTodosByIdMutationHookResult = ReturnType<typeof useDuplicateTodosByIdMutation>;
export type DuplicateTodosByIdMutationResult = Apollo.MutationResult<DuplicateTodosByIdMutation>;
export type DuplicateTodosByIdMutationOptions = Apollo.BaseMutationOptions<DuplicateTodosByIdMutation, DuplicateTodosByIdMutationVariables>;