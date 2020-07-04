import React from 'react';
// @ts-ignore
import Linkify from 'react-linkify';
import { Flex, Text, Box } from 'rebass';
import { printTodoStatus } from '../../../viewModels/TodoStatusVM';
import { Badge } from './Badge';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ListItem } from '../../layout/List';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';

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

const TodoListStatus: React.FunctionComponent<{ status: TodoStatus }> = ({
  status,
}) => {
  return (
    <Flex
      width={16}
      height={16}
      alignItems="center"
      justifyContent="center"
      sx={{ border: '2px solid gray' }}
    >
      <Text>{printTodoStatus(status)}</Text>
    </Flex>
  );
};

const TodoListTags: React.FunctionComponent<{
  tags: CategoryTagFragment[];
}> = ({ tags }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <Flex justifyContent="flex-end">
      {tags.map((tag, i) => (
        <Box key={tag.id} display="inline-block" ml={i === 0 ? 0 : 1}>
          <Badge key={tag.id} color={tag.color} text={tag.name} />
        </Box>
      ))}
    </Flex>
  );
};

export const TodoListItem: React.FunctionComponent<{
  isActive: boolean;
  todo: CategoryTodoFragment;
  onClick: (todo: CategoryTodoFragment) => void;
}> = ({ isActive, todo, onClick }) => {
  const handleClick = React.useCallback(() => {
    onClick(todo);
  }, [todo, onClick]);

  return (
    <ListItem
      isActive={isActive}
      item={todo}
      onClick={handleClick}
      mainElement={<CustomizedLinkify text={todo.text} />}
      leftElement={<TodoListStatus status={todo.status} />}
      rightElement={<TodoListTags tags={todo.tags} />}
    ></ListItem>
  );
};
