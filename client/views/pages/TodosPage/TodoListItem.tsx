// FIXME: Use layout components instead of using rebass directly
import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { RootTodoFragment } from '../../../graphql/__generated__/Todo.graphql';
import { ListItem } from '../../layout/List';
import { TodoListStatus } from './TodoListStatus';
import { TodoListTags } from './TodoListTags';
import { TodoListText } from './TodoListText';

export const TodoListItem: React.FunctionComponent<{
  isSelected: boolean;
  onClick: (todo: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment) => void;
  onClickToggle: (todo: RootTodoFragment) => void;
  todo: RootTodoFragment;
}> = ({ isSelected, onClick, onClickStatus, onClickToggle, todo }) => {
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
        <>
          <Box onClick={handleClickToggle}>
            <Checkbox checked={isSelected} readOnly />
          </Box>
          <TodoListStatus status={todo.status} onClick={handleClickStatus} />
        </>
      }
      mainElement={<TodoListText text={todo.text} />}
      rightElement={<TodoListTags tags={todo.tags} />}
      onClick={onClick}
    ></ListItem>
  );
};
