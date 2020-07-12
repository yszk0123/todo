// FIXME: Use layout components instead of using rebass directly
import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Box, Flex } from 'rebass';

import { Label } from '../../shared/components/Label';
import { ListItem } from '../../shared/components/List';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoListStatus } from './TodoListStatus';
import { TodoListTags } from './TodoListTags';
import { TodoListText } from './TodoListText';

export const TodoListItem: React.FunctionComponent<{
  isCategoryNameShown: boolean;
  isSelectMode: boolean;
  isSelected: boolean;
  onClick: (todo: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment) => void;
  onClickTag: (tag: TodoTagFragment) => void;
  onClickToggle: (todo: RootTodoFragment) => void;
  todo: RootTodoFragment;
}> = ({
  isCategoryNameShown,
  isSelectMode,
  isSelected,
  onClick,
  onClickStatus,
  onClickTag,
  onClickToggle,
  todo,
}) => {
  const handleClickToggle = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClickToggle(todo);
    },
    [todo, onClickToggle]
  );
  const handleClickStatus = React.useCallback(() => {
    onClickStatus(todo);
  }, [todo, onClickStatus]);

  const isDone = todo.status === TodoStatus.Done;

  return (
    <ListItem
      isActive={isSelected}
      isDim={isDone}
      item={todo}
      leftElement={
        isSelectMode ? (
          <Box onClick={handleClickToggle}>
            <Checkbox checked={isSelected} marginRight={0} readOnly />
          </Box>
        ) : (
          <TodoListStatus status={todo.status} onClick={handleClickStatus} />
        )
      }
      mainElement={
        <TodoListText
          subElement={
            <>
              <TodoListTags tags={todo.tags} onClick={onClickTag} />
              {isCategoryNameShown && (
                <Flex ml={1}>
                  <Label text={todo.category.name} />
                </Flex>
              )}
            </>
          }
          text={todo.text}
        />
      }
      onClick={onClick}
    ></ListItem>
  );
};
