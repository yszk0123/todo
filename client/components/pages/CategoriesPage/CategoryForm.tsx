import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Input } from '@rebass/forms';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { preventDefault } from '../../../handlers/preventDefault';

export const CategoryForm: React.FunctionComponent<{
  name: string;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneCategory: () => void;
  onUpdateOneCategory: () => void;
  onDeleteOneCategory: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneCategory,
  onUpdateOneCategory,
  onDeleteOneCategory,
}) => {
  return (
    <Box
      sx={{ boxShadow: 1, p: 2 }}
      as="form"
      onSubmit={preventDefault}
      onClick={stopPropagation}
    >
      <Flex alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        {isSelected ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={onDeleteOneCategory}
            >
              Delete
            </Button>
            <Button
              type="submit"
              variant="outline"
              sx={{ flexGrow: 1, ml: 2 }}
              onClick={onUpdateOneCategory}
            >
              Update
            </Button>
          </>
        ) : (
          <Button
            type="submit"
            variant="primary"
            sx={{ flexGrow: 1 }}
            onClick={onCreateOneCategory}
          >
            Create
          </Button>
        )}
      </Flex>
    </Box>
  );
};
