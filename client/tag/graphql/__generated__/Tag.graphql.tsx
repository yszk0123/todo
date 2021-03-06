import * as Types from '../../../shared/graphql/__generated__/baseTypes';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetTagsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetTagsQuery = (
  { __typename?: 'Query' }
  & { tags: Array<(
    { __typename?: 'Tag' }
    & RootTagFragment
  )> }
);

export type CreateOneTagMutationVariables = Types.Exact<{
  data: Types.TagCreateInput;
}>;


export type CreateOneTagMutation = (
  { __typename?: 'Mutation' }
  & { createOneTag: (
    { __typename?: 'Tag' }
    & RootTagFragment
  ) }
);

export type UpdateOneTagMutationVariables = Types.Exact<{
  data: Types.TagUpdateInput;
  where: Types.TagWhereUniqueInput;
}>;


export type UpdateOneTagMutation = (
  { __typename?: 'Mutation' }
  & { updateOneTag?: Types.Maybe<(
    { __typename?: 'Tag' }
    & RootTagFragment
  )> }
);

export type DeleteOneTagMutationVariables = Types.Exact<{
  where: Types.TagWhereUniqueInput;
}>;


export type DeleteOneTagMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneTag?: Types.Maybe<(
    { __typename?: 'Tag' }
    & Pick<Types.Tag, 'id'>
  )> }
);

export type RootTagFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name' | 'color'>
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )>, parent?: Types.Maybe<(
    { __typename?: 'Tag' }
    & TagParentFragment
  )> }
);

export type TagParentFragment = (
  { __typename?: 'Tag' }
  & Pick<Types.Tag, 'id' | 'name' | 'color'>
);

export const TagParentFragmentDoc = gql`
    fragment TagParent on Tag {
  id
  name
  color
}
    `;
export const RootTagFragmentDoc = gql`
    fragment RootTag on Tag {
  id
  name
  color
  categories {
    id
    name
  }
  parent {
    ...TagParent
  }
}
    ${TagParentFragmentDoc}`;
export const GetTagsDocument = gql`
    query GetTags {
  tags(where: {archivedAt: {equals: null}}) {
    ...RootTag
  }
}
    ${RootTagFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, baseOptions);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, baseOptions);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export function refetchGetTagsQuery(variables?: GetTagsQueryVariables) {
      return { query: GetTagsDocument, variables: variables }
    }
export const CreateOneTagDocument = gql`
    mutation CreateOneTag($data: TagCreateInput!) {
  createOneTag(data: $data) {
    ...RootTag
  }
}
    ${RootTagFragmentDoc}`;
export type CreateOneTagMutationFn = Apollo.MutationFunction<CreateOneTagMutation, CreateOneTagMutationVariables>;

/**
 * __useCreateOneTagMutation__
 *
 * To run a mutation, you first call `useCreateOneTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneTagMutation, { data, loading, error }] = useCreateOneTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneTagMutation, CreateOneTagMutationVariables>) {
        return Apollo.useMutation<CreateOneTagMutation, CreateOneTagMutationVariables>(CreateOneTagDocument, baseOptions);
      }
export type CreateOneTagMutationHookResult = ReturnType<typeof useCreateOneTagMutation>;
export type CreateOneTagMutationResult = Apollo.MutationResult<CreateOneTagMutation>;
export type CreateOneTagMutationOptions = Apollo.BaseMutationOptions<CreateOneTagMutation, CreateOneTagMutationVariables>;
export const UpdateOneTagDocument = gql`
    mutation UpdateOneTag($data: TagUpdateInput!, $where: TagWhereUniqueInput!) {
  updateOneTag(data: $data, where: $where) {
    ...RootTag
  }
}
    ${RootTagFragmentDoc}`;
export type UpdateOneTagMutationFn = Apollo.MutationFunction<UpdateOneTagMutation, UpdateOneTagMutationVariables>;

/**
 * __useUpdateOneTagMutation__
 *
 * To run a mutation, you first call `useUpdateOneTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneTagMutation, { data, loading, error }] = useUpdateOneTagMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneTagMutation, UpdateOneTagMutationVariables>) {
        return Apollo.useMutation<UpdateOneTagMutation, UpdateOneTagMutationVariables>(UpdateOneTagDocument, baseOptions);
      }
export type UpdateOneTagMutationHookResult = ReturnType<typeof useUpdateOneTagMutation>;
export type UpdateOneTagMutationResult = Apollo.MutationResult<UpdateOneTagMutation>;
export type UpdateOneTagMutationOptions = Apollo.BaseMutationOptions<UpdateOneTagMutation, UpdateOneTagMutationVariables>;
export const DeleteOneTagDocument = gql`
    mutation DeleteOneTag($where: TagWhereUniqueInput!) {
  deleteOneTag(where: $where) {
    id
  }
}
    `;
export type DeleteOneTagMutationFn = Apollo.MutationFunction<DeleteOneTagMutation, DeleteOneTagMutationVariables>;

/**
 * __useDeleteOneTagMutation__
 *
 * To run a mutation, you first call `useDeleteOneTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneTagMutation, { data, loading, error }] = useDeleteOneTagMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneTagMutation(baseOptions?: Apollo.MutationHookOptions<DeleteOneTagMutation, DeleteOneTagMutationVariables>) {
        return Apollo.useMutation<DeleteOneTagMutation, DeleteOneTagMutationVariables>(DeleteOneTagDocument, baseOptions);
      }
export type DeleteOneTagMutationHookResult = ReturnType<typeof useDeleteOneTagMutation>;
export type DeleteOneTagMutationResult = Apollo.MutationResult<DeleteOneTagMutation>;
export type DeleteOneTagMutationOptions = Apollo.BaseMutationOptions<DeleteOneTagMutation, DeleteOneTagMutationVariables>;