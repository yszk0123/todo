import React from 'react';

import { Color } from '../../../graphql/__generated__/baseTypes';
import { RootCategoryFragment } from '../../../graphql/fragments/__generated__/RootCategory.graphql';
import { identity } from '../../helpers/identity';
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
  categories: RootCategoryFragment[];
  color: Color;
  isSelected: boolean;
  name: string;
  onChangeColor: (color: Color | null) => void;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTag: () => void;
  onDeleteOneTag: () => void;
  onToggleCategory: (category: RootCategoryFragment) => void;
  onUpdateOneTag: () => void;
  tagCategories: RootCategoryFragment[];
}> = ({
  categories,
  color,
  isSelected,
  name,
  onChangeColor,
  onChangeName,
  onCreateOneTag,
  onDeleteOneTag,
  onToggleCategory,
  onUpdateOneTag,
  tagCategories,
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
        items={categories}
        onClick={onToggleCategory}
      />
      <EditFormInputField value={name} onChange={onChangeName} />
      <EditFormSelectField
        getDisplayName={identity}
        getValue={identity}
        items={colors}
        rightElement={<ColorBox color={color} />}
        selectedItem={color}
        onChange={onChangeColor}
      />
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
