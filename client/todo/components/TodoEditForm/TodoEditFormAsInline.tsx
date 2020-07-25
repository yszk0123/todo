import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { EditForm } from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { SelectMode } from '../../../view_models/SelectMode';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoEditFormValues } from '../../view_models/TodoEditFormValues';
import { TodoEditFormCategoryField } from './TodoEditFormCategoryField';
import { TodoEditFormCheckpointField } from './TodoEditFormCheckpointField';
import { TodoEditFormStatusField } from './TodoEditFormStatusField';
import { TodoEditFormTagsField } from './TodoEditFormTagsField';

const SingleForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeTags,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  todoEditFormValues,
}) => {
  return (
    <EditForm isInline>
      <TodoEditFormCategoryField
        categories={categories}
        category={todoEditFormValues.category}
        onSelectCategory={onSelectCategory}
      />
      <TodoEditFormCheckpointField
        checkpoint={todoEditFormValues.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoEditFormTagsField
        categoryTags={categoryTags}
        tags={todoEditFormValues.tags}
        onChangeTags={onChangeTags}
      />
      <TodoEditFormStatusField
        status={todoEditFormValues.status}
        onSelectStatus={onSelectStatus}
      />
    </EditForm>
  );
};

const MultiForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeTags,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  todoEditFormValues,
}) => {
  return (
    <EditForm isInline>
      <TodoEditFormCategoryField
        categories={categories}
        category={todoEditFormValues.category}
        onSelectCategory={onSelectCategory}
      />
      <TodoEditFormCheckpointField
        checkpoint={todoEditFormValues.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoEditFormTagsField
        categoryTags={categoryTags}
        tags={todoEditFormValues.tags}
        onChangeTags={onChangeTags}
      />
      <TodoEditFormStatusField
        status={todoEditFormValues.status}
        onSelectStatus={onSelectStatus}
      />
    </EditForm>
  );
};

export const TodoEditFormAsInline: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  selectMode: SelectMode;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeTags,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  selectMode,
  todoEditFormValues,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return null;
    }
    case SelectMode.SINGLE: {
      return (
        <SingleForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          todoEditFormValues={todoEditFormValues}
          onChangeTags={onChangeTags}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
        />
      );
    }
    case SelectMode.MULTI: {
      return (
        <MultiForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          todoEditFormValues={todoEditFormValues}
          onChangeTags={onChangeTags}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
        />
      );
    }
  }
};
