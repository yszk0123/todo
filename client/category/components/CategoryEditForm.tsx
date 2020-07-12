import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
} from '../../shared/components/EditForm';
import { Modal } from '../../shared/components/Modal';
import { CategoryEditFormState } from '../ducks/CategoryEditFormDucks';

export const CategoryEditForm: React.FunctionComponent<{
  categoryEditFormState: CategoryEditFormState;
  isOpen: boolean;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCloseModal: () => void;
  onCreateOneCategory: () => void;
  onDeleteOneCategory: () => void;
  onUpdateOneCategory: () => void;
}> = ({
  categoryEditFormState,
  isOpen,
  isSelected,
  onChangeName,
  onCloseModal,
  onCreateOneCategory,
  onDeleteOneCategory,
  onUpdateOneCategory,
}) => {
  const actions: EditFormAction[] = isSelected
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
