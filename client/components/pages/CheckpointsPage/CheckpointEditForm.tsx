import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormDateTimeInputField,
  EditFormInputField,
} from '../../layout/EditForm';

export const CheckpointEditForm: React.FunctionComponent<{
  endAt: Date | null;
  isSelected: boolean;
  name: string | null;
  onArchiveOneCheckpoint: () => void;
  onChangeEndAt: (endAt: Date | null) => void;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCheckpoint: () => void;
  onDeleteOneCheckpoint: () => void;
  onUpdateOneCheckpoint: () => void;
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
