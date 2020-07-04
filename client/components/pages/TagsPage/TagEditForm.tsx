import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Input, Select } from '@rebass/forms';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { CheckboxList } from '../../molecules/CheckboxList';
import { ColorBox } from '../CategoryTodosPage/ColorBox';
import { Color } from '../../../graphql/__generated__/baseTypes';
import {
  EditForm,
  EditFormChecklistField,
  EditFormInputField,
  EditFormActionsField,
  EditFormAction,
} from '../../layout/EditForm';

const colors = Object.values(Color);

export const TagEditForm: React.FunctionComponent<{
  name: string;
  color: Color;
  tagCategories: CategoryVM[];
  categories: CategoryVM[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onChangeColor: React.ChangeEventHandler<HTMLSelectElement>;
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
        isFirst
        items={categories}
        checkedItems={tagCategories}
        onClick={onToggleCategory}
      />
      <EditFormInputField value={name} onChange={onChangeName} />
      <Flex alignItems="center" mt={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Select value={color} onChange={onChangeColor}>
            {colors.map((c) => {
              return <option key={c}>{c}</option>;
            })}
          </Select>
        </Box>
        <Box ml={2}>
          <ColorBox color={color} />
        </Box>
      </Flex>
      <EditFormActionsField actions={actions} />
    </EditForm>
  );
};
