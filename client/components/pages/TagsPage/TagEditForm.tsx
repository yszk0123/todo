import React from 'react';

import { Color } from '../../../graphql/__generated__/baseTypes';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { parseColorString } from '../../helpers/parseColorString';
import { ColorBox } from '../../layout/ColorBox';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormChecklistField,
  EditFormInputField,
  EditFormSelectField,
} from '../../layout/EditForm';

const colors = Object.values(Color);

export const TagEditForm: React.FunctionComponent<{
  name: string;
  color: Color;
  tagCategories: CategoryVM[];
  categories: CategoryVM[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeColor: (color: Color) => void;
  onCreateOneTag: () => void;
  onUpdateOneTag: () => void;
  onDeleteOneTag: () => void;
  onToggleCategory: (category: CategoryVM) => void;
}> = ({
  name,
  color,
  tagCategories,
  categories,
  isSelected,
  onChangeName,
  onChangeColor,
  onCreateOneTag,
  onUpdateOneTag,
  onDeleteOneTag,
  onToggleCategory,
}) => {
  const actions: EditFormAction[] = isSelected
    ? [
        { label: 'Delete', onClick: onDeleteOneTag },
        { label: 'Update', onClick: onUpdateOneTag },
      ]
    : [{ label: 'Create', onClick: onCreateOneTag }];

  return (
    <EditForm>
      <EditFormChecklistField
        checkedItems={tagCategories}
        isFirst
        items={categories}
        onClick={onToggleCategory}
      />
      <EditFormInputField value={name} onChange={onChangeName} />
      <EditFormSelectField
        items={colors}
        parseString={parseColorString}
        rightElement={<ColorBox color={color} />}
        selectedItem={color}
        onChange={onChangeColor}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
