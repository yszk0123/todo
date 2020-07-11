import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { SelectMode } from '../../../viewModels/SelectMode';
import { TodoSearchFormState } from '../../ducks/TodoSearchFormDucks';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchFormCategoryField } from './TodoSearchFormCategoryField';
import { TodoSearchFormCheckpointField } from './TodoSearchFormCheckpointField';
import { TodoSearchFormStatusField } from './TodoSearchFormStatusField';
import { TodoSearchFormTagsField } from './TodoSearchFormTagsField';
import { TodoSearchFormTextField } from './TodoSearchFormTextField';

const NoneForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchFormState: TodoSearchFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onChangeText,
  onCreateOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  todoSearchFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Create', onClick: onCreateOneTodo },
  ];

  return (
    <EditForm>
      <TodoSearchFormTagsField
        categoryTags={categoryTags}
        tags={todoSearchFormState.tags}
        onToggleTag={onToggleTag}
      />
      <TodoSearchFormStatusField
        status={todoSearchFormState.status}
        onSelectStatus={onSelectStatus}
      />
      <TodoSearchFormCheckpointField
        checkpoint={todoSearchFormState.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoSearchFormCategoryField
        categories={categories}
        category={todoSearchFormState.category}
        onSelectCategory={onSelectCategory}
      />
      <TodoSearchFormTextField
        text={todoSearchFormState.text}
        onChangeText={onChangeText}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const SingleForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onArchiveTodo: () => void;
  onChangeText: (text: string) => void;
  onDeleteOneTodo: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  todoSearchFormState: TodoSearchFormState;
}> = ({
  categoryTags,
  checkpoints,
  onArchiveTodo,
  onChangeText,
  onDeleteOneTodo,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  todoSearchFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <EditForm>
      <TodoSearchFormTagsField
        categoryTags={categoryTags}
        tags={todoSearchFormState.tags}
        onToggleTag={onToggleTag}
      />
      <TodoSearchFormStatusField
        status={todoSearchFormState.status}
        onSelectStatus={onSelectStatus}
      />
      <TodoSearchFormCheckpointField
        checkpoint={todoSearchFormState.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoSearchFormTextField
        text={todoSearchFormState.text}
        onChangeText={onChangeText}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const MultiForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onArchiveTodo: () => void;
  onDeleteOneTodo: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  todoSearchFormState: TodoSearchFormState;
}> = ({
  categoryTags,
  checkpoints,
  onArchiveTodo,
  onDeleteOneTodo,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  todoSearchFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <EditForm>
      <TodoSearchFormTagsField
        categoryTags={categoryTags}
        tags={todoSearchFormState.tags}
        onToggleTag={onToggleTag}
      />
      <TodoSearchFormStatusField
        status={todoSearchFormState.status}
        onSelectStatus={onSelectStatus}
      />
      <TodoSearchFormCheckpointField
        checkpoint={todoSearchFormState.checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

export const TodoSearchForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onArchiveTodo: () => void;
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  selectMode: SelectMode;
  todoSearchFormState: TodoSearchFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  onArchiveTodo,
  onChangeText,
  onCreateOneTodo,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  selectMode,
  todoSearchFormState,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          todoSearchFormState={todoSearchFormState}
          onChangeText={onChangeText}
          onCreateOneTodo={onCreateOneTodo}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
        />
      );
    }
    case SelectMode.SINGLE: {
      return (
        <SingleForm
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          todoSearchFormState={todoSearchFormState}
          onArchiveTodo={onArchiveTodo}
          onChangeText={onChangeText}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
          onUpdateOneTodo={onUpdateOneTodo}
        />
      );
    }
    case SelectMode.MULTI: {
      return (
        <MultiForm
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          todoSearchFormState={todoSearchFormState}
          onArchiveTodo={onArchiveTodo}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
          onUpdateOneTodo={onUpdateOneTodo}
        />
      );
    }
  }
};
