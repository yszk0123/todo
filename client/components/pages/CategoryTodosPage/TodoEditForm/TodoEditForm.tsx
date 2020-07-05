import React from 'react';

import { TodoStatus } from '../../../../graphql/__generated__/baseTypes';
import { CategoryTagFragment } from '../../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { RootCheckpointFragment } from '../../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { SelectMode } from '../../../../viewModels/SelectMode';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
} from '../../../layout/EditForm';
import { TodoEditFormCheckpointField } from './TodoEditFormCheckpointField';
import { TodoEditFormStatusField } from './TodoEditFormStatusField';
import { TodoEditFormTagsField } from './TodoEditFormTagsField';
import { TodoEditFormTextField } from './TodoEditFormTextField';

const NoneForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[] | null;
  status: TodoStatus | null;
  categoryTags: CategoryTagFragment[];
  checkpoints: RootCheckpointFragment[];
  checkpoint: RootCheckpointFragment | null;
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}> = ({
  text,
  tags,
  status,
  categoryTags,
  checkpoints,
  checkpoint,
  onChangeText,
  onCreateOneTodo,
  onToggleTag,
  onSelectStatus,
  onSelectCheckpoint,
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
      <TodoEditFormTextField text={text} onChangeText={onChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const SingleForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[] | null;
  status: TodoStatus | null;
  categoryTags: CategoryTagFragment[];
  checkpoints: RootCheckpointFragment[];
  checkpoint: RootCheckpointFragment | null;
  onChangeText: (text: string) => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}> = ({
  text,
  tags,
  status,
  categoryTags,
  checkpoints,
  checkpoint,
  onChangeText,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
  onSelectCheckpoint,
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
  tags: CategoryTagFragment[] | null;
  status: TodoStatus | null;
  categoryTags: CategoryTagFragment[];
  checkpoints: RootCheckpointFragment[];
  checkpoint: RootCheckpointFragment | null;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}> = ({
  tags,
  status,
  categoryTags,
  checkpoints,
  checkpoint,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
  onSelectCheckpoint,
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
  text: string;
  tags: CategoryTagFragment[] | null;
  status: TodoStatus | null;
  categoryTags: CategoryTagFragment[];
  selectMode: SelectMode;
  checkpoints: RootCheckpointFragment[];
  checkpoint: RootCheckpointFragment | null;
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
  onSelectCheckpoint: (checkpoint: RootCheckpointFragment | null) => void;
}> = ({
  text,
  tags,
  status,
  checkpoints,
  checkpoint,
  categoryTags,
  selectMode,
  onChangeText,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
  onSelectCheckpoint,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categoryTags={categoryTags}
          checkpoint={checkpoint}
          checkpoints={checkpoints}
          status={status}
          tags={tags}
          text={text}
          onChangeText={onChangeText}
          onCreateOneTodo={onCreateOneTodo}
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
