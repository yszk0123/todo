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
  onChangeEndAt: (endAt: DateTime | null) => void;
  onChangeName: (name: string) => void;
  onCloseModal: () => void;
  onCreateOneCheckpoint: () => void;
  onDeleteCheckpointsById: () => void;
  onUpdateCheckpointsById: () => void;
  selectMode: SelectMode;
}> = ({
  checkpointEditFormState,
  isOpen,
  onChangeEndAt,
  onChangeName,
  onCloseModal,
  onCreateOneCheckpoint,
  onDeleteCheckpointsById,
  onUpdateCheckpointsById,
  selectMode,
}) => {
  const actions: EditFormAction[] = isSelected(selectMode)
    ? [
        { label: 'Delete', onClick: onDeleteCheckpointsById },
        { label: 'Update', onClick: onUpdateCheckpointsById },
      ]
    : [{ label: 'Create', onClick: onCreateOneCheckpoint }];

  return (
    <Modal
      initialFocusSelector="#checkpoint-edit-name"
      isOpen={isOpen}
      onClose={onCloseModal}
    >
      <EditForm>
        <EditFormDateTimeInputField
          id="checkpoint-edit-end-at"
          label="EndAt"
          value={checkpointEditFormState.endAt}
          onChange={onChangeEndAt}
        />
        <EditFormInputField
          id="checkpoint-edit-name"
          label="Name"
          value={checkpointEditFormState.name ?? ''}
          onChange={onChangeName}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
