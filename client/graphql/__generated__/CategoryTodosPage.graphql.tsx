import * as Types from './baseTypes';

import { CategoryTodoFragment } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../fragments/__generated__/CategoryTag.graphql';
import { RootCheckpointFragment } from '../fragments/__generated__/RootCheckpoint.graphql';
import { RootCategoryFragment } from '../fragments/__generated__/RootCategory.graphql';
import gql from 'graphql-tag';
import { CategoryTodoFragmentDoc } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragmentDoc } from '../fragments/__generated__/CategoryTag.graphql';
import { RootCheckpointFragmentDoc } from '../fragments/__generated__/RootCheckpoint.graphql';
import { RootCategoryFragmentDoc } from '../fragments/__generated__/RootCategory.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CategoryTodosPageQueryVariables = Types.Exact<{
  where: Types.CategoryWhereUniqueInput;
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
  )>, checkpoints: Array<(
    { __typename?: 'Checkpoint' }
    & RootCheckpointFragment
  )>, categories: Array<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);

export type CreateOneTodoMutationVariables = Types.Exact<{
  input: Types.TodoCreateInput;
}>;


export type CreateOneTodoMutation = (
  { __typename?: 'Mutation' }
  & { createOneTodo: (
    { __typename?: 'Todo' }
    & CategoryTodoFragment
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
    & CategoryTodoFragment
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
    & CategoryTodoFragment
  )>> }
);


export const CategoryTodosPageDocument = gql`
    query CategoryTodosPage($where: CategoryWhereUniqueInput!) {
  me {
    id
  }
  category(where: $where) {
    id
    name
    todos(where: {archivedAt: {equals: null}}) {
      ...CategoryTodo
    }
    tags(orderBy: {name: asc}) {
      ...CategoryTag
    }
  }
  checkpoints {
    ...RootCheckpoint
  }
  categories {
    ...RootCategory
  }
}
    ${CategoryTodoFragmentDoc}
${CategoryTagFragmentDoc}
${RootCheckpointFragmentDoc}
${RootCategoryFragmentDoc}`;

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
 *      where: // value for 'where'
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
export const CreateOneTodoDocument = gql`
    mutation CreateOneTodo($input: TodoCreateInput!) {
  createOneTodo(data: $input) {
    ...CategoryTodo
  }
}
    ${CategoryTodoFragmentDoc}`;
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
    ...CategoryTodo
  }
}
    ${CategoryTodoFragmentDoc}`;
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
    ...CategoryTodo
  }
}
    ${CategoryTodoFragmentDoc}`;
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