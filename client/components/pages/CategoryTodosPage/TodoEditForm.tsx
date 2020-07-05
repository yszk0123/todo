import React from 'react';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { SelectMode } from '../../../viewModels/SelectMode';
import { Badge } from '../../layout/Badge';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormChecklistField,
  EditFormInputField,
  EditFormRadioField,
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
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  text,
  tags,
  status,
  categoryTags,
  onChangeText,
  onCreateOneTodo,
  onToggleTag,
  onSelectStatus,
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
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormInputField value={text} onChange={handleChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const SingleForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[];
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  onChangeText: (text: string) => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  text,
  tags,
  status,
  categoryTags,
  onChangeText,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
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
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormInputField value={text} onChange={handleChangeText} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

const MultiForm: React.FunctionComponent<{
  tags: CategoryTagFragment[];
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  isTagsChanged: boolean;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  tags,
  status,
  categoryTags,
  isTagsChanged,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
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
        selectedItem={status}
        onClick={onSelectStatus}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};

export const TodoEditForm: React.FunctionComponent<{
  text: string;
  tags: CategoryTagFragment[];
  isTagsChanged: boolean;
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  selectMode: SelectMode;
  onChangeText: (text: string) => void;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  text,
  tags,
  isTagsChanged,
  status,
  categoryTags,
  selectMode,
  onChangeText,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
}) => {
  switch (selectMode) {
    case SelectMode.NONE: {
      return (
        <NoneForm
          categoryTags={categoryTags}
          status={status}
          tags={tags}
          text={text}
          onChangeText={onChangeText}
          onCreateOneTodo={onCreateOneTodo}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
        />
      );
    }
    case SelectMode.SINGLE: {
      return (
        <SingleForm
          categoryTags={categoryTags}
          status={status}
          tags={tags}
          text={text}
          onArchiveTodo={onArchiveTodo}
          onChangeText={onChangeText}
          onDeleteOneTodo={onDeleteOneTodo}
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
          isTagsChanged={isTagsChanged}
          status={status}
          tags={tags}
          onArchiveTodo={onArchiveTodo}
          onDeleteOneTodo={onDeleteOneTodo}
          onSelectStatus={onSelectStatus}
          onToggleTag={onToggleTag}
          onUpdateOneTodo={onUpdateOneTodo}
        />
      );
    }
  }
};
