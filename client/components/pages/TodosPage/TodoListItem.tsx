import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import { Flex, Text, Box } from 'rebass';
import { TodoVM } from '../../../viewModels/TodoVM';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';
import { Badge } from './Badge';

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

  const isArchived = todo.archivedAt !== null;

  return (
    <Flex alignItems="center">
      <Flex
        flex="1 1 auto"
        alignItems="center"
        p={2}
        bg={isActive ? 'highlight' : undefined}
        color={isArchived ? 'lightgray' : undefined}
        onClick={handleClick}
      >
        <Text width={16} sx={{ whiteSpace: 'nowrap' }}>
          [{printTodoStatus(todo.status)}]
        </Text>
        <Text ml={2}>
          <Linkify componentDecorator={linkifyComponentDecorator}>
            {todo.text}
          </Linkify>
        </Text>
        {todo.tags.length > 0 && (
          <Box ml={2}>
            {todo.tags.map((tag) => (
              <Box key={tag.id} display="inline-block" ml={1}>
                <Badge key={tag.id} text={tag.name} />
              </Box>
            ))}
          </Box>
        )}
      </Flex>
    </Flex>
  );
};
