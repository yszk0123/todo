import * as Types from './baseTypes';

import { CategoryTodoFragment } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragment } from '../fragments/__generated__/CategoryTag.graphql';
import gql from 'graphql-tag';
import { CategoryTodoFragmentDoc } from '../fragments/__generated__/CategoryTodo.graphql';
import { CategoryTagFragmentDoc } from '../fragments/__generated__/CategoryTag.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CategoryTodosPageQueryVariables = Types.Exact<{
  categoryId: Types.Scalars['Int'];
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


export const CategoryTodosPageDocument = gql`
    query CategoryTodosPage($categoryId: Int!) {
  me {
    id
  }
  category(id: $categoryId) {
    id
    name
    todos(where: {archivedAt: {equals: null}}, orderBy: {status: asc}) {
      ...CategoryTodo
    }
    tags(orderBy: {name: asc}) {
      ...CategoryTag
    }
  }
}
    ${CategoryTodoFragmentDoc}
${CategoryTagFragmentDoc}`;

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
 *      categoryId: // value for 'categoryId'
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