// FIXME: Use layout components instead of using rebass directly
import { Checkbox } from '@rebass/forms';
import React from 'react';
import { Box } from 'rebass';

import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ListItem } from '../../layout/List';
import { TodoListStatus } from './TodoListStatus';
import { TodoListTags } from './TodoListTags';
import { TodoListText } from './TodoListText';

export const TodoListItem: React.FunctionComponent<{
  isSelected: boolean;
  todo: CategoryTodoFragment;
  onClick: (todo: CategoryTodoFragment) => void;
  onClickToggle: (todo: CategoryTodoFragment) => void;
}> = ({ isSelected, todo, onClick, onClickToggle }) => {
  const handleClickToggle = React.useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClickToggle(todo);
    },
    [todo, onClickToggle]
  );

  return (
    <ListItem
      isActive={isSelected}
      item={todo}
      leftElement={
        <>
          <Box onClick={handleClickToggle}>
            <Checkbox checked={isSelected} readOnly />
          </Box>
          <TodoListStatus status={todo.status} />
        </>
      }
      mainElement={<TodoListText text={todo.text} />}
      rightElement={<TodoListTags tags={todo.tags} />}
      onClick={onClick}
    ></ListItem>
  );
};
