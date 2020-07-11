import React from 'react';

import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormInputField,
} from '../../shared/components/EditForm';

export const CategoryEditForm: React.FunctionComponent<{
  isSelected: boolean;
  name: string;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCategory: () => void;
  onDeleteOneCategory: () => void;
  onUpdateOneCategory: () => void;
}> = ({
  isSelected,
  name,
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
      <EditFormInputField value={name} onChange={onChangeName} />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
