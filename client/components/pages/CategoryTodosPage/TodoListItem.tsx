import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import { Flex, Text, Box } from 'rebass';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';
import { Badge } from './Badge';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';

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
  todo: CategoryTodoFragment;
  onClick: (todo: CategoryTodoFragment) => void;
}> = ({ isActive, todo, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(todo);
  }, [todo, onClick]);

  const isArchived = todo.archivedAt !== null;

  return (
    <Flex
      flex="1 1 auto"
      alignItems="center"
      p={2}
      bg={isActive ? 'highlight' : undefined}
      color={isArchived ? 'lightgray' : undefined}
      sx={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      <Flex
        width={16}
        height={16}
        alignItems="center"
        justifyContent="center"
        sx={{ border: '2px solid gray', flexShrink: 0 }}
      >
        <Text>{printTodoStatus(todo.status)}</Text>
      </Flex>
      <Text sx={{ ml: 2, flexGrow: 1 }}>
        <Linkify componentDecorator={linkifyComponentDecorator}>
          {todo.text}
        </Linkify>
      </Text>
      {todo.tags.length > 0 && (
        <Box
          ml={2}
          sx={{
            flexShrink: 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {todo.tags.map((tag) => (
            <Box key={tag.id} display="inline-block" ml={1}>
              <Badge key={tag.id} text={tag.name} />
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  );
};
