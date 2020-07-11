import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormDateTimeInputField,
  EditFormInputField,
} from '../../shared/components/EditForm';
import { DateTime } from '../../viewModels/DateTime';
import { CheckpointEditFormState } from '../ducks/CheckpointEditFormStateDucks';

export const CheckpointEditForm: React.FunctionComponent<{
  checkpointEditFormState: CheckpointEditFormState;
  isSelected: boolean;
  onArchiveOneCheckpoint: () => void;
  onChangeEndAt: (endAt: DateTime | null) => void;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCheckpoint: () => void;
  onDeleteOneCheckpoint: () => void;
  onUpdateOneCheckpoint: () => void;
}> = ({
  checkpointEditFormState,
  isSelected,
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
      <EditFormInputField
        value={checkpointEditFormState.name ?? ''}
        onChange={onChangeName}
      />
      <EditFormDateTimeInputField
        value={checkpointEditFormState.endAt}
        onChange={onChangeEndAt}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
