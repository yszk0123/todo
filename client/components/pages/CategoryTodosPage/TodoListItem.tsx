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

function linkifyTextDecorator(text: string): string {
  const simplifiedText = text
    .replace(/^https?:\/\//, '')
    .replace(/\?.*$/, '')
    .replace(/#.*$/, '')
    .replace(
      /^github.com\/[^\/]+\/([^\/]+)\/(?:pull|issue)\/([0-9]+)$/,
      '$1 #$2'
    );

  const splittedText = simplifiedText.split('/');
  if (splittedText.length >= 5) {
    return [
      splittedText[0],
      splittedText[1],
      '...',
      splittedText[splittedText.length - 1],
    ].join('/');
  }

  return simplifiedText;
}

const CustomizedLinkify: React.FunctionComponent<{ text: string }> = React.memo(
  ({ text }) => {
    return (
      <Linkify
        componentDecorator={linkifyComponentDecorator}
        textDecorator={linkifyTextDecorator}
      >
        {text}
      </Linkify>
    );
  }
);

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
      color={isArchived ? 'lightgray' : isActive ? 'highlightText' : undefined}
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
        <CustomizedLinkify text={todo.text} />
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
              <Badge key={tag.id} color={tag.color} text={tag.name} />
            </Box>
          ))}
        </Box>
      )}
    </Flex>
  );
};
