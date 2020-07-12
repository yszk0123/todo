import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
} from '../../shared/components/EditForm';
import { Modal } from '../../shared/components/Modal';
import { isSelected, SelectMode } from '../../view_models/SelectMode';
import { CategoryEditFormState } from '../ducks/CategoryEditFormDucks';

export const CategoryEditForm: React.FunctionComponent<{
  categoryEditFormState: CategoryEditFormState;
  isOpen: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCloseModal: () => void;
  onCreateOneCategory: () => void;
  onDeleteOneCategory: () => void;
  onUpdateOneCategory: () => void;
  selectMode: SelectMode;
}> = ({
  categoryEditFormState,
  isOpen,
  onChangeName,
  onCloseModal,
  onCreateOneCategory,
  onDeleteOneCategory,
  onUpdateOneCategory,
  selectMode,
}) => {
  const actions: EditFormAction[] = isSelected(selectMode)
    ? [
        { label: 'Delete', onClick: onDeleteOneCategory },
        { label: 'Update', onClick: onUpdateOneCategory },
      ]
    : [{ label: 'Create', onClick: onCreateOneCategory }];

  return (
    <Modal isOpen={isOpen} onClickOuter={onCloseModal}>
      <EditForm>
        <EditFormInputField
          value={categoryEditFormState.name}
          onChange={onChangeName}
        />
        <EditFormActionsField actions={actions} />
      </EditForm>
    </Modal>
  );
};
