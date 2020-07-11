import React from 'react';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { ColorBox } from '../../shared/components/ColorBox';
import {
  EditForm,
  EditFormAction,
  EditFormActionsField,
  EditFormChecklistField,
  EditFormInputField,
  EditFormSelectField,
} from '../../shared/components/EditForm';
import { Color } from '../../shared/graphql/__generated__/baseTypes';
import { identity } from '../../shared/helpers/identity';

const colors = Object.values(Color);

export const TagEditForm: React.FunctionComponent<{
  categories: RootCategoryFragment[];
  color: Color;
  isSelected: boolean;
  name: string;
  onArchiveOneTag: () => void;
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
  onArchiveOneTag,
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
        { label: 'Archive', onClick: onArchiveOneTag },
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
