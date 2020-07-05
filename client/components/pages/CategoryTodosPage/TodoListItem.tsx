// FIXME: Use layout components instead of using rebass directly
import React from 'react';
import { Checkbox } from '@rebass/forms';
import { Box } from 'rebass';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ListItem } from '../../layout/List';
import { TodoListText } from './TodoListText';
import { TodoListStatus } from './TodoListStatus';
import { TodoListTags } from './TodoListTags';

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
      onClick={onClick}
      mainElement={<TodoListText text={todo.text} />}
      leftElement={
        <>
          <Box onClick={handleClickToggle}>
            <Checkbox readOnly checked={isSelected} />
          </Box>
          <TodoListStatus status={todo.status} />
        </>
      }
      rightElement={<TodoListTags tags={todo.tags} />}
    ></ListItem>
  );
};
