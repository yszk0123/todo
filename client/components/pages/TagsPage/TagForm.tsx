import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Input, Select } from '@rebass/forms';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { preventDefault } from '../../../handlers/preventDefault';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { CheckboxList } from '../../molecules/CheckboxList';
import { ColorBox } from '../CategoryTodosPage/ColorBox';
import { Color } from '../../../graphql/__generated__/baseTypes';

const colors = Object.values(Color);

export const TagForm: React.FunctionComponent<{
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
  return (
    <Box
      sx={{ boxShadow: 1, p: 2 }}
      as="form"
      onSubmit={preventDefault}
      onClick={stopPropagation}
    >
      <Flex>
        <CheckboxList
          items={categories}
          checkedItems={tagCategories}
          onClick={onToggleCategory}
        />
      </Flex>
      <Flex alignItems="center" mt={2}>
        <Input value={name} onChange={onChangeName} />
      </Flex>
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
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        {isSelected ? (
          <>
            <Button type="button" variant="outline" onClick={onDeleteOneTag}>
              Delete
            </Button>
            <Button
              type="submit"
              variant="primary"
              sx={{ flexGrow: 1, ml: 2 }}
              onClick={onUpdateOneTag}
            >
              Update
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            sx={{ flexGrow: 1 }}
            variant="primary"
            onClick={onCreateOneTag}
          >
            Create
          </Button>
        )}
      </Flex>
    </Box>
  );
};
