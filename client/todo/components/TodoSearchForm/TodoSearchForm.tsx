import React from 'react';

import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { Modal } from '../../../shared/components/Modal';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { DateTime } from '../../../viewModels/DateTime';
import { TodoSearchFormValue } from '../../ducks/TodoSearchFormDucks';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
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
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchFormValue: TodoSearchFormValue;
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
  todoSearchFormValue,
}) => {
  const actions: EditFormAction[] = [
    { label: 'Reset', onClick: onReset },
    { label: 'Search', onClick: onCommit },
  ];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <TodoSearchFormTagsField
          categoryTags={categoryTags}
          tags={todoSearchFormValue.tags}
          onToggleTag={onToggleTag}
        />
        <TodoSearchFormStatusField
          status={todoSearchFormValue.status}
          onSelectStatus={onSelectStatus}
        />
        <TodoSearchFormCheckpointField
          checkpoint={todoSearchFormValue.checkpoint}
          checkpoints={checkpoints}
          onSelectCheckpoint={onSelectCheckpoint}
        />
        <TodoSearchFormTextField
          text={todoSearchFormValue.text}
          onChangeText={onChangeText}
        />
        <TodoSearchFormArchivedAtField
          value={todoSearchFormValue.archivedAt}
          onChange={onChangeArchivedAt}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
