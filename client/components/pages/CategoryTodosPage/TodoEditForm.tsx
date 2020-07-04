import React from 'react';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
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

export const TodoEditForm: React.FunctionComponent<{
  name: string;
  tags: CategoryTagFragment[];
  status: TodoStatus;
  categoryTags: CategoryTagFragment[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onArchiveTodo: () => void;
  onToggleTag: (tag: CategoryTagFragment) => void;
  onSelectStatus: (status: TodoStatus) => void;
}> = ({
  name,
  tags,
  status,
  categoryTags,
  isSelected,
  onChangeName,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onArchiveTodo,
  onToggleTag,
  onSelectStatus,
}) => {
  const actions: EditFormAction[] = isSelected
    ? [
        { label: 'Delete', onClick: onDeleteOneTodo },
        { label: 'Archive', onClick: onArchiveTodo },
        { label: 'Update', onClick: onUpdateOneTodo },
      ]
    : [{ label: 'Create', onClick: onCreateOneTodo }];

  return (
    <EditForm>
      <EditFormChecklistField
        isFirst
        items={categoryTags}
        checkedItems={tags}
        onClick={onToggleTag}
      />
      <EditFormRadioField
        selectedItem={status}
        items={statuses}
        onClick={onSelectStatus}
      />
      <EditFormInputField value={name} onChange={onChangeName} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
