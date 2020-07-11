import * as Types from './baseTypes';

import { RootTagFragment } from './Tag.graphql';
import gql from 'graphql-tag';
import { RootTagFragmentDoc } from './Tag.graphql';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type TagsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TagsPageQuery = (
  { __typename?: 'Query' }
  & { me?: Types.Maybe<(
    { __typename?: 'User' }
    & Pick<Types.User, 'id'>
  )>, tags: Array<(
    { __typename?: 'Tag' }
    & RootTagFragment
  )>, categories: Array<(
    { __typename?: 'Category' }
    & Pick<Types.Category, 'id' | 'name'>
  )> }
);


export const TagsPageDocument = gql`
    query TagsPage {
  me {
    id
  }
  tags {
    ...RootTag
  }
  categories {
    id
    name
  }
}
    ${RootTagFragmentDoc}`;

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