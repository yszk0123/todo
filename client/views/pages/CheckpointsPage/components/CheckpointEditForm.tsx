import React from 'react';

import { DateTime } from '../../../../viewModels/DateTime';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormDateTimeInputField,
  EditFormInputField,
} from '../../../components/EditForm';

export const CheckpointEditForm: React.FunctionComponent<{
  endAt: DateTime | null;
  isSelected: boolean;
  name: string | null;
  onArchiveOneCheckpoint: () => void;
  onChangeEndAt: (endAt: DateTime | null) => void;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCheckpoint: () => void;
  onDeleteOneCheckpoint: () => void;
  onUpdateOneCheckpoint: () => void;
}> = ({
  endAt,
  isSelected,
  name,
  onArchiveOneCheckpoint,
  onChangeEndAt,
  onChangeName,
  onCreateOneCheckpoint,
  onDeleteOneCheckpoint,
  onUpdateOneCheckpoint,
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
