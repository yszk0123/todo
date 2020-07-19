import React from 'react';

import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { Modal } from '../../../shared/components/Modal';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { DateTime } from '../../../view_models/DateTime';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchFormValues } from '../../view_models/TodoSearchFormValues';
import { TodoSearchFormArchivedAtField } from './TodoSearchFormArchivedAtField';
import { TodoSearchFormCheckpointField } from './TodoSearchFormCheckpointField';
import { TodoSearchFormStatusField } from './TodoSearchFormStatusField';
import { TodoSearchFormTagsField } from './TodoSearchFormTagsField';
import { TodoSearchFormTextField } from './TodoSearchFormTextField';

export const TodoSearchForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  isOpen: boolean;
  onChangeArchivedAt: (archivedAt: DateTime | null) => void;
  onChangeText: (text: string) => void;
  onCloseModal: () => void;
  onCommit: () => void;
  onReset: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus | null) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchFormValues: TodoSearchFormValues;
}> = ({
  categoryTags,
  checkpoints,
  isOpen,
  onChangeArchivedAt,
  onChangeText,
  onCloseModal,
  onCommit,
  onReset,
  onSelectCheckpoint,
  onSelectStatus,
  onToggleTag,
  todoSearchFormValues,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Reset', onClick: onReset },
    { label: 'Search', onClick: onCommit },
  ];

  return (
    <Modal
      initialFocusSelector="#todo-search-text"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
        <TodoSearchFormCheckpointField
          checkpoint={todoSearchFormValues.checkpoint}
          checkpoints={checkpoints}
          onSelectCheckpoint={onSelectCheckpoint}
        />
        <TodoSearchFormTagsField
          categoryTags={categoryTags}
          tags={todoSearchFormValues.tags}
          onToggleTag={onToggleTag}
        />
        <TodoSearchFormStatusField
          status={todoSearchFormValues.status}
          onSelectStatus={onSelectStatus}
        />
        <TodoSearchFormArchivedAtField
          value={todoSearchFormValues.archivedAt}
          onChange={onChangeArchivedAt}
        />
        <TodoSearchFormTextField
          text={todoSearchFormValues.text}
          onChangeText={onChangeText}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
