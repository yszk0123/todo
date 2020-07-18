import React from 'react';

import { ListBadges, ListLabel } from '../../../shared/components/List';
import {
  TodoCategoryFragment,
  TodoTagFragment,
} from '../../graphql/__generated__/Todo.graphql';

export const TodoListTags: React.FunctionComponent<{
  category: TodoCategoryFragment;
  isCategoryNameShown: boolean;
  onClickCategory: (tag: TodoCategoryFragment) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  tags: TodoTagFragment[];
}> = ({ category, isCategoryNameShown, onClickCategory, onClickTag, tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <>
      <ListBadges items={tags} onClick={onClickTag} />
      {isCategoryNameShown && (
        <ListLabel item={category} onClick={onClickCategory} />
      )}
    </>
  );
};
