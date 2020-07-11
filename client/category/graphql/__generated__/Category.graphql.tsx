import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type GetCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);

export type CreateOneCategoryMutationVariables = Types.Exact<{
  data: Types.CategoryCreateInput;
}>;


export type CreateOneCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createOneCategory: (
    { __typename?: 'Category' }
    & RootCategoryFragment
  ) }
);

export type UpdateOneCategoryMutationVariables = Types.Exact<{
  data: Types.CategoryUpdateInput;
  where: Types.CategoryWhereUniqueInput;
}>;


export type UpdateOneCategoryMutation = (
  { __typename?: 'Mutation' }
  & { updateOneCategory?: Types.Maybe<(
    { __typename?: 'Category' }
    & RootCategoryFragment
  )> }
);

export type DeleteOneCategoryMutationVariables = Types.Exact<{
  where: Types.CategoryWhereUniqueInput;
}>;


export type DeleteOneCategoryMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneCategory?: Types.Maybe<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id'>
  )> }
);

export type RootCategoryFragment = (
  { __typename?: 'Category' }
  & Pick<Types.Category, 'id' | 'name'>
);

export const RootCategoryFragmentDoc = gql`
    fragment RootCategory on Category {
  id
  name
}
    `;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    ...RootCategory
  }
}
    ${RootCategoryFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = ApolloReactCommon.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export function refetchGetCategoriesQuery(variables?: GetCategoriesQueryVariables) {
      return { query: GetCategoriesDocument, variables: variables }
    }
export const CreateOneCategoryDocument = gql`
    mutation CreateOneCategory($data: CategoryCreateInput!) {
  createOneCategory(data: $data) {
    ...RootCategory
  }
}
    ${RootCategoryFragmentDoc}`;
export type CreateOneCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>;

/**
 * __useCreateOneCategoryMutation__
 *
 * To run a mutation, you first call `useCreateOneCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCategoryMutation, { data, loading, error }] = useCreateOneCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>(CreateOneCategoryDocument, baseOptions);
      }
export type CreateOneCategoryMutationHookResult = ReturnType<typeof useCreateOneCategoryMutation>;
export type CreateOneCategoryMutationResult = ApolloReactCommon.MutationResult<CreateOneCategoryMutation>;
export type CreateOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneCategoryMutation, CreateOneCategoryMutationVariables>;
export const UpdateOneCategoryDocument = gql`
    mutation UpdateOneCategory($data: CategoryUpdateInput!, $where: CategoryWhereUniqueInput!) {
  updateOneCategory(data: $data, where: $where) {
    ...RootCategory
  }
}
    ${RootCategoryFragmentDoc}`;
export type UpdateOneCategoryMutationFn = ApolloReactCommon.MutationFunction<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>;

/**
 * __useUpdateOneCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateOneCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCategoryMutation, { data, loading, error }] = useUpdateOneCategoryMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>(UpdateOneCategoryDocument, baseOptions);
      }
export type UpdateOneCategoryMutationHookResult = ReturnType<typeof useUpdateOneCategoryMutation>;
export type UpdateOneCategoryMutationResult = ApolloReactCommon.MutationResult<UpdateOneCategoryMutation>;
export type UpdateOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneCategoryMutation, UpdateOneCategoryMutationVariables>;
export const DeleteOneCategoryDocument = gql`
    mutation DeleteOneCategory($where: CategoryWhereUniqueInput!) {
  deleteOneCategory(where: $where) {
    id
  }
}
    `;
export type DeleteOneCategoryMutationFn = ApolloReactCommon.MutationFunction<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>;

/**
 * __useDeleteOneCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteOneCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCategoryMutation, { data, loading, error }] = useDeleteOneCategoryMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>(DeleteOneCategoryDocument, baseOptions);
      }
export type DeleteOneCategoryMutationHookResult = ReturnType<typeof useDeleteOneCategoryMutation>;
export type DeleteOneCategoryMutationResult = ApolloReactCommon.MutationResult<DeleteOneCategoryMutation>;
export type DeleteOneCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneCategoryMutation, DeleteOneCategoryMutationVariables>;