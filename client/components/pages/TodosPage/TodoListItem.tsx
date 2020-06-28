import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import { Flex, Text, Box } from 'rebass';
import { Checkbox } from '@rebass/forms';
import { TodoVM } from '../../../viewModels/TodoVM';

function linkifyComponentDecorator(
  decoratedHref: string,
  decoratedText: string,
  key: number
): React.ReactNode {
  return (
    <a href={decoratedHref} rel="noopener" target="_blank" key={key}>
      {decoratedText}
    </a>
  );
}

export const TodoListItem: React.FunctionComponent<{
  isActive: boolean;
  todo: TodoVM;
  onClick: (todo: TodoVM) => void;
}> = ({ isActive, todo, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(todo);
  }, [todo, onClick]);

  const tags = React.useMemo(
    () => todo.tags.map((t) => `#${t.name}`).join(', '),
    [todo.tags]
  );

  return (
    <Flex alignItems="center" p={2}>
      <Checkbox />
      <Box
        flex="1 1 auto"
        bg={isActive ? 'highlight' : undefined}
        onClick={handleClick}
      >
        <Text>
          <Linkify componentDecorator={linkifyComponentDecorator}>
            {todo.text}
          </Linkify>
        </Text>
        {tags && <Text color="gray">{` ${tags}`}</Text>}
      </Box>
    </Flex>
  );
};
