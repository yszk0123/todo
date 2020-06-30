import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Input } from '@rebass/forms';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { preventDefault } from '../../../handlers/preventDefault';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { CheckboxList } from '../../molecules/CheckboxList';

export const TagForm: React.FunctionComponent<{
  name: string;
  tagCategories: CategoryVM[];
  categories: CategoryVM[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTag: () => void;
  onUpdateOneTag: () => void;
  onDeleteOneTag: () => void;
  onToggleCategory: (category: CategoryVM) => void;
}> = ({
  name,
  tagCategories,
  categories,
  isSelected,
  onChangeName,
  onCreateOneTag,
  onUpdateOneTag,
  onDeleteOneTag,
  onToggleCategory,
}) => {
  return (
    <Box as="form" onSubmit={preventDefault} onClick={stopPropagation}>
      <Flex>
        <CheckboxList
          items={categories}
          checkedItems={tagCategories}
          onClick={onToggleCategory}
        />
      </Flex>
      <Flex alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        {isSelected ? (
          <>
            <Button type="button" variant="outline" onClick={onDeleteOneTag}>
              Delete
            </Button>
            <Button
              type="submit"
              width={1}
              variant="primary"
              ml={2}
              onClick={onUpdateOneTag}
            >
              Update
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            width={1}
            ml={2}
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
