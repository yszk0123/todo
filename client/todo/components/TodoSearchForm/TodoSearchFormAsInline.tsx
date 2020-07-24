import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { EditForm } from '../../../shared/components/EditForm';
import { EMPTY } from '../../../shared/constants/EMPTY';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../../view_models/TodoSearchQuery';
import { TodoSearchFormCategoryField } from './TodoSearchFormCategoryField';
import { TodoSearchFormCheckpointField } from './TodoSearchFormCheckpointField';
import { TodoSearchFormStatusField } from './TodoSearchFormStatusField';
import { TodoSearchFormTagsField } from './TodoSearchFormTagsField';

function isNotMaybe<T>(value: T | null | undefined): value is T {
  return value != null;
}

export const TodoSearchFormAsInline: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeStatus: (status: TodoStatus | null) => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchQuery: TodoSearchQuery;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeStatus,
  onSelectCategory,
  onSelectCheckpoint,
  onToggleTag,
  todoSearchQuery,
}) => {
  const category = React.useMemo(
    () =>
      categories.find(
        (category) => category.id === todoSearchQuery.categoryId
      ) ?? null,
    [todoSearchQuery.categoryId, categories]
  );
  const checkpoint = React.useMemo(
    () =>
      checkpoints.find(
        (checkpoint) => checkpoint.id === todoSearchQuery.checkpointId
      ) ?? null,
    [todoSearchQuery.checkpointId, checkpoints]
  );
  const tags = React.useMemo(
    () =>
      todoSearchQuery.tagIds
        ?.map((tagId) => categoryTags.find((tag) => tag.id === tagId))
        .filter(isNotMaybe) ?? EMPTY,
    [todoSearchQuery.tagIds, categoryTags]
  );

  return (
    <EditForm isInline>
      <TodoSearchFormCategoryField
        categories={categories}
        category={category}
        onSelectCategory={onSelectCategory}
      />
      <TodoSearchFormCheckpointField
        checkpoint={checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoSearchFormTagsField
        categoryTags={categoryTags}
        tags={tags}
        onToggleTag={onToggleTag}
      />
      <TodoSearchFormStatusField
        status={todoSearchQuery.status}
        onSelectStatus={onChangeStatus}
      />
    </EditForm>
  );
};
