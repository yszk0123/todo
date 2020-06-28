import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type TagsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TagsPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, tags?: Types.Maybe<Array<(
    { __typename?: 'Tag' }
    & Pick<Types.Tag, 'id' | 'name'>
  )>> }
);

export type CreateOneTagMutationVariables = Types.Exact<{
  data: Types.TagCreateInput;
}>;


export type CreateOneTagMutation = (
  { __typename?: 'Mutation' }
  & { createOneTag: (
    { __typename?: 'Tag' }
    & Pick<Types.Tag, 'id' | 'name'>
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
    & Pick<Types.Tag, 'id'>
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


export const TagsPageDocument = gql`
    query TagsPage {
  me {
    id
  }
  tags {
    id
    name
  }
}
    `;

/**
 * __useTagsPageQuery__
 *
 * To run a query within a React component, call `useTagsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TagsPageQuery, TagsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<TagsPageQuery, TagsPageQueryVariables>(TagsPageDocument, baseOptions);
      }
export function useTagsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TagsPageQuery, TagsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TagsPageQuery, TagsPageQueryVariables>(TagsPageDocument, baseOptions);
        }
export type TagsPageQueryHookResult = ReturnType<typeof useTagsPageQuery>;
export type TagsPageLazyQueryHookResult = ReturnType<typeof useTagsPageLazyQuery>;
export type TagsPageQueryResult = ApolloReactCommon.QueryResult<TagsPageQuery, TagsPageQueryVariables>;
export function refetchTagsPageQuery(variables?: TagsPageQueryVariables) {
      return { query: TagsPageDocument, variables: variables }
    }
export const CreateOneTagDocument = gql`
    mutation CreateOneTag($data: TagCreateInput!) {
  createOneTag(data: $data) {
    id
    name
  }
}
    `;
export type CreateOneTagMutationFn = ApolloReactCommon.MutationFunction<CreateOneTagMutation, CreateOneTagMutationVariables>;

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
export function useCreateOneTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneTagMutation, CreateOneTagMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOneTagMutation, CreateOneTagMutationVariables>(CreateOneTagDocument, baseOptions);
      }
export type CreateOneTagMutationHookResult = ReturnType<typeof useCreateOneTagMutation>;
export type CreateOneTagMutationResult = ApolloReactCommon.MutationResult<CreateOneTagMutation>;
export type CreateOneTagMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneTagMutation, CreateOneTagMutationVariables>;
export const UpdateOneTagDocument = gql`
    mutation UpdateOneTag($data: TagUpdateInput!, $where: TagWhereUniqueInput!) {
  updateOneTag(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateOneTagMutationFn = ApolloReactCommon.MutationFunction<UpdateOneTagMutation, UpdateOneTagMutationVariables>;

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
export function useUpdateOneTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneTagMutation, UpdateOneTagMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneTagMutation, UpdateOneTagMutationVariables>(UpdateOneTagDocument, baseOptions);
      }
export type UpdateOneTagMutationHookResult = ReturnType<typeof useUpdateOneTagMutation>;
export type UpdateOneTagMutationResult = ApolloReactCommon.MutationResult<UpdateOneTagMutation>;
export type UpdateOneTagMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneTagMutation, UpdateOneTagMutationVariables>;
export const DeleteOneTagDocument = gql`
    mutation DeleteOneTag($where: TagWhereUniqueInput!) {
  deleteOneTag(where: $where) {
    id
  }
}
    `;
export type DeleteOneTagMutationFn = ApolloReactCommon.MutationFunction<DeleteOneTagMutation, DeleteOneTagMutationVariables>;

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
export function useDeleteOneTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneTagMutation, DeleteOneTagMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOneTagMutation, DeleteOneTagMutationVariables>(DeleteOneTagDocument, baseOptions);
      }
export type DeleteOneTagMutationHookResult = ReturnType<typeof useDeleteOneTagMutation>;
export type DeleteOneTagMutationResult = ApolloReactCommon.MutationResult<DeleteOneTagMutation>;
export type DeleteOneTagMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneTagMutation, DeleteOneTagMutationVariables>;