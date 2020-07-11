import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
} from '../../shared/components/EditForm';
import { CategoryEditFormState } from '../ducks/CategoryEditFormDucks';

export const CategoryEditForm: React.FunctionComponent<{
  categoryEditFormState: CategoryEditFormState;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCategory: () => void;
  onDeleteOneCategory: () => void;
  onUpdateOneCategory: () => void;
}> = ({
  categoryEditFormState,
  isSelected,
  onChangeName,
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
    <EditForm>
      <EditFormInputField
        value={categoryEditFormState.name}
        onChange={onChangeName}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
