import React from 'react';

import { RootCategoryFragment } from '../../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { Modal } from '../../../shared/components/Modal';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { SelectMode } from '../../../view_models/SelectMode';
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
  checkpoints: RootCheckpointFragment[];
  isOpen: boolean;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onCreateOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onChangeText,
  onCloseModal,
  onCreateOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  todoEditFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Create', onClick: onCreateOneTodo },
  ];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <TodoEditFormTagsField
          categoryTags={categoryTags}
          tags={todoEditFormState.tags}
          onToggleTag={onToggleTag}
        />
        <TodoEditFormStatusField
          status={todoEditFormState.status}
          onSelectStatus={onSelectStatus}
        />
        <TodoEditFormCheckpointField
          checkpoint={todoEditFormState.checkpoint}
          checkpoints={checkpoints}
          onSelectCheckpoint={onSelectCheckpoint}
        />
        <TodoEditFormCategoryField
          categories={categories}
          category={todoEditFormState.category}
          onSelectCategory={onSelectCategory}
        />
        <TodoEditFormTextField
          text={todoEditFormState.text}
          onChangeText={onChangeText}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};

const SingleForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  isOpen: boolean;
  onArchiveTodo: () => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onArchiveTodo,
  onChangeText,
  onCloseModal,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  todoEditFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <TodoEditFormTagsField
          categoryTags={categoryTags}
          tags={todoEditFormState.tags}
          onToggleTag={onToggleTag}
        />
        <TodoEditFormStatusField
          status={todoEditFormState.status}
          onSelectStatus={onSelectStatus}
        />
        <TodoEditFormCheckpointField
          checkpoint={todoEditFormState.checkpoint}
          checkpoints={checkpoints}
          onSelectCheckpoint={onSelectCheckpoint}
        />
        <TodoEditFormCategoryField
          categories={categories}
          category={todoEditFormState.category}
          onSelectCategory={onSelectCategory}
        />
        <TodoEditFormTextField
          text={todoEditFormState.text}
          onChangeText={onChangeText}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};

const MultiForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  isOpen: boolean;
  onArchiveTodo: () => void;
  onCloseModal: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onArchiveTodo,
  onCloseModal,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  todoEditFormState,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <TodoEditFormTagsField
          categoryTags={categoryTags}
          tags={todoEditFormState.tags}
          onToggleTag={onToggleTag}
        />
        <TodoEditFormStatusField
          status={todoEditFormState.status}
          onSelectStatus={onSelectStatus}
        />
        <TodoEditFormCheckpointField
          checkpoint={todoEditFormState.checkpoint}
          checkpoints={checkpoints}
          onSelectCheckpoint={onSelectCheckpoint}
        />
        <TodoEditFormCategoryField
          categories={categories}
          category={todoEditFormState.category}
          onSelectCategory={onSelectCategory}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};

export const TodoEditForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  isOpen: boolean;
  onArchiveTodo: () => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onCreateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  onUpdateOneTodo: () => void;
  selectMode: SelectMode;
  todoEditFormState: TodoEditFormState;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onArchiveTodo,
  onChangeText,
  onCloseModal,
  onCreateOneTodo,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  onUpdateOneTodo,
  selectMode,
  todoEditFormState,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          isOpen={isOpen}
          todoEditFormState={todoEditFormState}
          onChangeText={onChangeText}
          onCloseModal={onCloseModal}
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
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          isOpen={isOpen}
          todoEditFormState={todoEditFormState}
          onArchiveTodo={onArchiveTodo}
          onChangeText={onChangeText}
          onCloseModal={onCloseModal}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCategory={onSelectCategory}
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
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          isOpen={isOpen}
          todoEditFormState={todoEditFormState}
          onArchiveTodo={onArchiveTodo}
          onCloseModal={onCloseModal}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
          onUpdateOneTodo={onUpdateOneTodo}
        />
      );
    }
  }
};
