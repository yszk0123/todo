import React from 'react';
import { Button, Flex, Box, Text } from 'rebass';
import { Input, Checkbox } from '@rebass/forms';
import { preventDefault } from '../../../handlers/preventDefault';
import { stopPropagation } from '../../../handlers/stopPropagation';
import { TagVM } from '../../../viewModels/TagVM';

function createLookupTable(tags: TagVM[]): Record<string, true | undefined> {
  const table: Record<string, true | undefined> = {};
  tags.forEach((tag) => {
    table[tag.id] = true;
  });
  return table;
}

const Item: React.FunctionComponent<{
  tag: TagVM;
  isChecked: boolean;
  onClick: (tag: TagVM) => void;
}> = ({ tag, isChecked, onClick }) => {
  const handleClick = React.useCallback(
    (event: React.SyntheticEvent) => {
      onClick(tag);
      event.preventDefault();
    },
    [tag, onClick]
  );

  return (
    <Box key={tag.id} onClick={handleClick}>
      <Checkbox readOnly checked={isChecked} onClick={preventDefault} />
      <Text>{tag.name}</Text>
    </Box>
  );
};

export const TodoForm: React.FunctionComponent<{
  name: string;
  tags: TagVM[];
  categoryTags: TagVM[];
  isSelected: boolean;
  onChangeName: React.ChangeEventHandler<HTMLInputElement>;
  onCreateOneTodo: () => void;
  onUpdateOneTodo: () => void;
  onDeleteOneTodo: () => void;
  onToggleTag: (tag: TagVM) => void;
}> = ({
  name,
  tags,
  categoryTags,
  isSelected,
  onChangeName,
  onCreateOneTodo,
  onUpdateOneTodo,
  onDeleteOneTodo,
  onToggleTag,
}) => {
  const lookupTable = React.useMemo(() => createLookupTable(tags), [tags]);

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
          onClick={onDeleteOneTodo}
        >
          Delete
        </Button>
        <Button
          type="button"
          width={1}
          variant="outline"
          ml={2}
          disabled={!isSelected}
          onClick={onUpdateOneTodo}
        >
          Update
        </Button>
        <Button
          type="submit"
          width={1}
          ml={2}
          variant="primary"
          onClick={onCreateOneTodo}
        >
          Create
        </Button>
      </Flex>
      <Box>
        {categoryTags.map((categoryTag) => {
          const isChecked = lookupTable[categoryTag.id] === true;

          return (
            <Item
              key={categoryTag.id}
              tag={categoryTag}
              isChecked={isChecked}
              onClick={onToggleTag}
            />
          );
        })}
      </Box>
    </Box>
  );
};
