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
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoEditFormValues } from '../../view_models/TodoEditFormValues';
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
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onCreateOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onChangeTags,
  onChangeText,
  onCloseModal,
  onCreateOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  todoEditFormValues,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Create', onClick: onCreateOneTodo },
  ];

  return (
    <Modal
      initialFocusSelector="#todo-edit-text"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
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
        <TodoEditFormTextField
          text={todoEditFormValues.text}
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
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onUpdateOneTodo: () => void;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onChangeTags,
  onChangeText,
  onCloseModal,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onUpdateOneTodo,
  todoEditFormValues,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <Modal
      initialFocusSelector="#todo-edit-text"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
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
        <TodoEditFormTextField
          text={todoEditFormValues.text}
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
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onCloseModal: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onUpdateOneTodo: () => void;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onChangeTags,
  onCloseModal,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onUpdateOneTodo,
  todoEditFormValues,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <Modal
      initialFocusSelector="#todo-edit-text"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
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
  onChangeTags: (tags: TodoTagFragment[]) => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onCreateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onSelectCategory: (category: RootCategoryFragment | null) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onUpdateOneTodo: () => void;
  selectMode: SelectMode;
  todoEditFormValues: TodoEditFormValues;
}> = ({
  categories,
  categoryTags,
  checkpoints,
  isOpen,
  onChangeTags,
  onChangeText,
  onCloseModal,
  onCreateOneTodo,
  onDeleteOneTodo,
  onSelectCategory,
  onSelectCheckpoint,
  onSelectStatus,
  onUpdateOneTodo,
  selectMode,
  todoEditFormValues,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categories={categories}
          categoryTags={categoryTags}
          checkpoints={checkpoints}
          isOpen={isOpen}
          todoEditFormValues={todoEditFormValues}
          onChangeTags={onChangeTags}
          onChangeText={onChangeText}
          onCloseModal={onCloseModal}
          onCreateOneTodo={onCreateOneTodo}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
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
          todoEditFormValues={todoEditFormValues}
          onChangeTags={onChangeTags}
          onChangeText={onChangeText}
          onCloseModal={onCloseModal}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
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
          todoEditFormValues={todoEditFormValues}
          onChangeTags={onChangeTags}
          onCloseModal={onCloseModal}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectCategory={onSelectCategory}
          onSelectCheckpoint={onSelectCheckpoint}
          onSelectStatus={onSelectStatus}
          onUpdateOneTodo={onUpdateOneTodo}
        />
      );
    }
  }
};
