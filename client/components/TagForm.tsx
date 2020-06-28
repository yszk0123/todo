import React from 'react';
import { Button, Flex, Box } from 'rebass';
import { Input } from '@rebass/forms';
import { stopPropagation } from '../handlers/stopPropagation';
import { preventDefault } from '../handlers/preventDefault';

export const TagForm: React.FunctionComponent<{
  name: string;
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTag: () => void;
  onUpdateOneTag: () => void;
  onDeleteOneTag: () => void;
}> = ({
  name,
  isSelected,
  onChangeName,
  onCreateOneTag,
  onUpdateOneTag,
  onDeleteOneTag,
}) => {
  return (
    <Box as="form" my={2} onSubmit={preventDefault} onClick={stopPropagation}>
      <Flex alignItems="center">
        <Input value={name} onChange={onChangeName} />
      </Flex>
      <Flex mt={2} alignItems="center" justifyContent="space-between">
        <Button
          type="button"
          width={1}
          variant="outline"
          onClick={onDeleteOneTag}
        >
          Delete
        </Button>
        <Button
          type="button"
          width={1}
          variant="outline"
          ml={2}
          disabled={!isSelected}
          onClick={onUpdateOneTag}
        >
          Update
        </Button>
        <Button
          type="submit"
          width={1}
          ml={2}
          variant="primary"
          onClick={onCreateOneTag}
        >
          Create
        </Button>
      </Flex>
    </Box>
  );
};
