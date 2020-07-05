import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormDateTimeInputField,
  EditFormInputField,
} from '../../layout/EditForm';

export const CheckpointEditForm: React.FunctionComponent<{
  name: string | null;
  endAt: Date | null;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEndAt: (endAt: Date | null) => void;
  onCreateOneCheckpoint: () => void;
  onUpdateOneCheckpoint: () => void;
  onArchiveOneCheckpoint: () => void;
  onDeleteOneCheckpoint: () => void;
}> = ({
  name,
  endAt,
  isSelected,
  onChangeName,
  onChangeEndAt,
  onCreateOneCheckpoint,
  onUpdateOneCheckpoint,
  onArchiveOneCheckpoint,
  onDeleteOneCheckpoint,
}) => {
  const actions: EditFormAction[] = isSelected
    ? [
        { label: 'Delete', onClick: onDeleteOneCheckpoint },
        { label: 'Archive', onClick: onArchiveOneCheckpoint },
        { label: 'Update', onClick: onUpdateOneCheckpoint },
      ]
    : [{ label: 'Create', onClick: onCreateOneCheckpoint }];

  return (
    <EditForm>
      <EditFormInputField value={name ?? ''} onChange={onChangeName} />
      <EditFormDateTimeInputField value={endAt} onChange={onChangeEndAt} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
