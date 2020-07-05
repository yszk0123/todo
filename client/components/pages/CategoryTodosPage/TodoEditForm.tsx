import React from 'react';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { SelectMode } from '../../../viewModels/SelectMode';
import { Badge } from '../../layout/Badge';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormChecklistField,
  EditFormInputField,
  EditFormRadioField,
  EditFormSelectField,
} from '../../layout/EditForm';

const statuses: TodoStatus[] = [
  TodoStatus.Todo,
  TodoStatus.InProgress,
  TodoStatus.Waiting,
  TodoStatus.Done,
];

const NoneForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[];
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
  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = event.currentTarget.value;
      onChangeText(text);
    },
    [onChangeText]
  );

  const actions: EditFormAction[] = [
    { label: 'Create', onClick: onCreateOneTodo },
  ];

  return (
    <EditForm>
      <EditFormChecklistField
        checkedItems={tags}
        isFirst
        items={categoryTags}
        onClick={onToggleTag}
      />
      <EditFormRadioField
        items={statuses}
        rightElement={!status ? <Badge text="preserved" /> : null}
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormSelectField
        getDisplayName={getDisplayNameFromCheckpoint}
        getValue={getValueFromCheckpoint}
        items={checkpoints}
        selectedItem={checkpoint}
        onChange={onSelectCheckpoint}
      />
      <EditFormInputField value={text} onChange={handleChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const SingleForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[];
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
  const handleChangeText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const text = event.currentTarget.value;
      onChangeText(text);
    },
    [onChangeText]
  );

  const actions: EditFormAction[] = [
    { label: 'Delete', onClick: onDeleteOneTodo },
    { label: 'Archive', onClick: onArchiveTodo },
    { label: 'Update', onClick: onUpdateOneTodo },
  ];

  return (
    <EditForm>
      <EditFormChecklistField
        checkedItems={tags}
        isFirst
        items={categoryTags}
        onClick={onToggleTag}
      />
      <EditFormRadioField
        items={statuses}
        rightElement={!status ? <Badge text="preserved" /> : null}
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormSelectField
        getDisplayName={getDisplayNameFromCheckpoint}
        getValue={getValueFromCheckpoint}
        items={checkpoints}
        selectedItem={checkpoint}
        onChange={onSelectCheckpoint}
      />
      <EditFormInputField value={text} onChange={handleChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const MultiForm: React.FunctionComponent<{
  tags: CategoryTagFragment[];
  status: TodoStatus | null;
  categoryTags: CategoryTagFragment[];
  checkpoints: RootCheckpointFragment[];
  checkpoint: RootCheckpointFragment | null;
  isTagsChanged: boolean;
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
  isTagsChanged,
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
      <EditFormChecklistField
        checkedItems={tags}
        isFirst
        items={categoryTags}
        rightElement={!isTagsChanged ? <Badge text="preserved" /> : null}
        onClick={onToggleTag}
      />
      <EditFormRadioField
        items={statuses}
        rightElement={!status ? <Badge text="preserved" /> : null}
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormSelectField
        getDisplayName={getDisplayNameFromCheckpoint}
        getValue={getValueFromCheckpoint}
        items={checkpoints}
        selectedItem={checkpoint}
        onChange={onSelectCheckpoint}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

function getDisplayNameFromCheckpoint(
  checkpoint: RootCheckpointFragment
): string {
  return checkpoint.name ?? '';
}
function getValueFromCheckpoint(checkpoint: RootCheckpointFragment): string {
  return checkpoint.id;
}

export const TodoEditForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[];
  isTagsChanged: boolean;
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
  isTagsChanged,
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
          isTagsChanged={isTagsChanged}
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
