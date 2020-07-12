import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormDateTimeInputField,
  EditFormInputField,
} from '../../shared/components/EditForm';
import { Modal } from '../../shared/components/Modal';
import { DateTime } from '../../view_models/DateTime';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CheckpointEditFormState } from '../ducks/CheckpointEditFormStateDucks';

export const CheckpointEditForm: React.FunctionComponent<{
  checkpointEditFormState: CheckpointEditFormState;
  isOpen: boolean;
  onArchiveOneCheckpoint: () => void;
  onChangeEndAt: (endAt: DateTime | null) => void;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCloseModal: () => void;
  onCreateOneCheckpoint: () => void;
  onDeleteCheckpointsById: () => void;
  onUpdateOneCheckpoint: () => void;
  selectMode: SelectMode;
}> = ({
  checkpointEditFormState,
  isOpen,
  onArchiveOneCheckpoint,
  onChangeEndAt,
  onChangeName,
  onCloseModal,
  onCreateOneCheckpoint,
  onDeleteCheckpointsById,
  onUpdateOneCheckpoint,
  selectMode,
}) => {
  const actions: EditFormAction[] = isSelected(selectMode)
    ? [
        { label: 'Delete', onClick: onDeleteCheckpointsById },
        { label: 'Archive', onClick: onArchiveOneCheckpoint },
        { label: 'Update', onClick: onUpdateOneCheckpoint },
      ]
    : [{ label: 'Create', onClick: onCreateOneCheckpoint }];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <EditFormInputField
          label="Name"
          value={checkpointEditFormState.name ?? ''}
          onChange={onChangeName}
        />
        <EditFormDateTimeInputField
          label="EndAt"
          value={checkpointEditFormState.endAt}
          onChange={onChangeEndAt}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
