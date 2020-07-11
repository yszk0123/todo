import React from 'react';

import { RootCheckpointFragment } from '../../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../shared/components/EditForm';
import { TodoStatus } from '../../../shared/graphql/__generated__/baseTypes';
import { TodoSearchFormValue } from '../../ducks/TodoSearchFormDucks';
import { TodoTagFragment } from '../../graphql/__generated__/Todo.graphql';
import { TodoSearchFormCheckpointField } from './TodoSearchFormCheckpointField';
import { TodoSearchFormStatusField } from './TodoSearchFormStatusField';
import { TodoSearchFormTagsField } from './TodoSearchFormTagsField';
import { TodoSearchFormTextField } from './TodoSearchFormTextField';

export const TodoSearchForm: React.FunctionComponent<{
  categoryTags: TodoTagFragment[];
  checkpoints: RootCheckpointFragment[];
  onChangeText: (text: string) => void;
  onCommit: () => void;
  onReset: () => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onToggleTag: (tag: TodoTagFragment) => void;
  todoSearchFormValue: TodoSearchFormValue;
}> = ({
  categoryTags,
  checkpoints,
  onChangeText,
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
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
