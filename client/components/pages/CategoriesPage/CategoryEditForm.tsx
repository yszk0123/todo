import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
} from '../../layout/EditForm';

export const CategoryEditForm: React.FunctionComponent<{
  isSelected: boolean;
  name: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCategory: () => void;
  onDeleteOneCategory: () => void;
  onUpdateOneCategory: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneCategory,
  onUpdateOneCategory,
  onDeleteOneCategory,
}) => {
  const actions: EditFormAction[] = isSelected
    ? [
        { label: 'Delete', onClick: onDeleteOneCategory },
        { label: 'Update', onClick: onUpdateOneCategory },
      ]
    : [{ label: 'Create', onClick: onCreateOneCategory }];

  return (
    <EditForm>
      <EditFormInputField value={name} onChange={onChangeName} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
