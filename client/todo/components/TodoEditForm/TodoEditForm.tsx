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
import { TodoEditFormState } from '../../ducks/TodoEditFormDucks';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoEditFormCategoryField } from './TodoEditFormCategoryField';
import { TodoEditFormCheckpointField } from './TodoEditFormCheckpointField';
import { TodoEditFormStatusField } from './TodoEditFormStatusField';
import { TodoEditFormTagsField } from './TodoEditFormTagsField';
import { TodoEditFormTextField } from './TodoEditFormTextField';

const NoneForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoint: RootCheckpointFragment | null;
  checkpoints: RootCheckpointFragment[];
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoint,
  checkpoints,
  onChangeText,
  onCreateOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  status,
  tags,
  text,
  todoEditFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Create', onClick: onCreateOneTodo },
  ];

  return (
    <EditForm>
      <TodoEditFormTagsField
        categoryTags={categoryTags}
        tags={tags}
        onToggleTag={onToggleTag}
      />
      <TodoEditFormStatusField
        status={status}
        onSelectStatus={onSelectStatus}
      />
      <TodoEditFormCheckpointField
        checkpoint={checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoEditFormCategoryField
        categories={categories}
        category={todoEditFormState.category}
        onSelectCategory={onSelectCategory}
      />
      <TodoEditFormTextField text={text} onChangeText={onChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const SingleForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoint: RootCheckpointFragment | null;
  checkpoints: RootCheckpointFragment[];
  onArchiveTodo: () => void;
  onChangeText: (text: string) => void;
  onDeleteOneTodo: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
}> = ({
  categoryTags,
  checkpoint,
  checkpoints,
  onArchiveTodo,
  onChangeText,
  onDeleteOneTodo,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  status,
  tags,
  text,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <EditForm>
      <TodoEditFormTagsField
        categoryTags={categoryTags}
        tags={tags}
        onToggleTag={onToggleTag}
      />
      <TodoEditFormStatusField
        status={status}
        onSelectStatus={onSelectStatus}
      />
      <TodoEditFormCheckpointField
        checkpoint={checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <TodoEditFormTextField text={text} onChangeText={onChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const MultiForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoint: RootCheckpointFragment | null;
  checkpoints: RootCheckpointFragment[];
  onArchiveTodo: () => void;
  onDeleteOneTodo: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
}> = ({
  categoryTags,
  checkpoint,
  checkpoints,
  onArchiveTodo,
  onDeleteOneTodo,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  status,
  tags,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <EditForm>
      <TodoEditFormTagsField
        categoryTags={categoryTags}
        tags={tags}
        onToggleTag={onToggleTag}
      />
      <TodoEditFormStatusField
        status={status}
        onSelectStatus={onSelectStatus}
      />
      <TodoEditFormCheckpointField
        checkpoint={checkpoint}
        checkpoints={checkpoints}
        onSelectCheckpoint={onSelectCheckpoint}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

export const TodoEditForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoint: RootCheckpointFragment | null;
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
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoint,
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
  status,
  tags,
  text,
  todoEditFormState,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          status={status}
          tags={tags}
          text={text}
          todoEditFormState={todoEditFormState}
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
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          status={status}
          tags={tags}
          text={text}
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
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          status={status}
          tags={tags}
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
