import * as Types from './baseTypes';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type CreateOneCheckpointMutationVariables = Types.Exact<{
  data: Types.CheckpointCreateInput;
}>;


export type CreateOneCheckpointMutation = (
  { __typename?: 'Mutation' }
  & { createOneCheckpoint: (
    { __typename?: 'Checkpoint' }
    & RootCheckpointFragment
  ) }
);

export type UpdateOneCheckpointMutationVariables = Types.Exact<{
  data: Types.CheckpointUpdateInput;
  where: Types.CheckpointWhereUniqueInput;
}>;


export type UpdateOneCheckpointMutation = (
  { __typename?: 'Mutation' }
  & { updateOneCheckpoint?: Types.Maybe<(
    { __typename?: 'Checkpoint' }
    & RootCheckpointFragment
  )> }
);

export type DeleteOneCheckpointMutationVariables = Types.Exact<{
  where: Types.CheckpointWhereUniqueInput;
}>;


export type DeleteOneCheckpointMutation = (
  { __typename?: 'Mutation' }
  & { deleteOneCheckpoint?: Types.Maybe<(
    { __typename?: 'Checkpoint' }
    & Pick<Types.Checkpoint, 'id'>
  )> }
);

export type RootCheckpointFragment = (
  { __typename?: 'Checkpoint' }
  & Pick<Types.Checkpoint, 'id' | 'name' | 'endAt'>
);

export const RootCheckpointFragmentDoc = gql`
    fragment RootCheckpoint on Checkpoint {
  id
  name
  endAt
}
    `;
export const CreateOneCheckpointDocument = gql`
    mutation CreateOneCheckpoint($data: CheckpointCreateInput!) {
  createOneCheckpoint(data: $data) {
    ...RootCheckpoint
  }
}
    ${RootCheckpointFragmentDoc}`;
export type CreateOneCheckpointMutationFn = ApolloReactCommon.MutationFunction<CreateOneCheckpointMutation, CreateOneCheckpointMutationVariables>;

/**
 * __useCreateOneCheckpointMutation__
 *
 * To run a mutation, you first call `useCreateOneCheckpointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOneCheckpointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOneCheckpointMutation, { data, loading, error }] = useCreateOneCheckpointMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateOneCheckpointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOneCheckpointMutation, CreateOneCheckpointMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateOneCheckpointMutation, CreateOneCheckpointMutationVariables>(CreateOneCheckpointDocument, baseOptions);
      }
export type CreateOneCheckpointMutationHookResult = ReturnType<typeof useCreateOneCheckpointMutation>;
export type CreateOneCheckpointMutationResult = ApolloReactCommon.MutationResult<CreateOneCheckpointMutation>;
export type CreateOneCheckpointMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateOneCheckpointMutation, CreateOneCheckpointMutationVariables>;
export const UpdateOneCheckpointDocument = gql`
    mutation UpdateOneCheckpoint($data: CheckpointUpdateInput!, $where: CheckpointWhereUniqueInput!) {
  updateOneCheckpoint(data: $data, where: $where) {
    ...RootCheckpoint
  }
}
    ${RootCheckpointFragmentDoc}`;
export type UpdateOneCheckpointMutationFn = ApolloReactCommon.MutationFunction<UpdateOneCheckpointMutation, UpdateOneCheckpointMutationVariables>;

/**
 * __useUpdateOneCheckpointMutation__
 *
 * To run a mutation, you first call `useUpdateOneCheckpointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneCheckpointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneCheckpointMutation, { data, loading, error }] = useUpdateOneCheckpointMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneCheckpointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateOneCheckpointMutation, UpdateOneCheckpointMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateOneCheckpointMutation, UpdateOneCheckpointMutationVariables>(UpdateOneCheckpointDocument, baseOptions);
      }
export type UpdateOneCheckpointMutationHookResult = ReturnType<typeof useUpdateOneCheckpointMutation>;
export type UpdateOneCheckpointMutationResult = ApolloReactCommon.MutationResult<UpdateOneCheckpointMutation>;
export type UpdateOneCheckpointMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateOneCheckpointMutation, UpdateOneCheckpointMutationVariables>;
export const DeleteOneCheckpointDocument = gql`
    mutation DeleteOneCheckpoint($where: CheckpointWhereUniqueInput!) {
  deleteOneCheckpoint(where: $where) {
    id
  }
}
    `;
export type DeleteOneCheckpointMutationFn = ApolloReactCommon.MutationFunction<DeleteOneCheckpointMutation, DeleteOneCheckpointMutationVariables>;

/**
 * __useDeleteOneCheckpointMutation__
 *
 * To run a mutation, you first call `useDeleteOneCheckpointMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOneCheckpointMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOneCheckpointMutation, { data, loading, error }] = useDeleteOneCheckpointMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteOneCheckpointMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteOneCheckpointMutation, DeleteOneCheckpointMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteOneCheckpointMutation, DeleteOneCheckpointMutationVariables>(DeleteOneCheckpointDocument, baseOptions);
      }
export type DeleteOneCheckpointMutationHookResult = ReturnType<typeof useDeleteOneCheckpointMutation>;
export type DeleteOneCheckpointMutationResult = ApolloReactCommon.MutationResult<DeleteOneCheckpointMutation>;
export type DeleteOneCheckpointMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteOneCheckpointMutation, DeleteOneCheckpointMutationVariables>;