import * as Types from '../../__generated__/baseTypes';

import { CategoryTagFragment } from './CategoryTag.graphql';
import gql from 'graphql-tag';
import { CategoryTagFragmentDoc } from './CategoryTag.graphql';

export type CategoryTodoFragment = (
  { __typename?: 'Todo' }
  & Pick<Types.Todo, 'id' | 'text' | 'categoryId' | 'status' | 'archivedAt'>
  & { tags: Array<(
    { __typename?: 'Tag' }
    & CategoryTagFragment
  )> }
);

export const CategoryTodoFragmentDoc = gql`
    fragment CategoryTodo on Todo {
  id
  text
  categoryId
  tags {
    ...CategoryTag
  }
  status
  archivedAt
}
    ${CategoryTagFragmentDoc}`;