import React from 'react';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ListItem } from '../../layout/List';
import { TodoListText } from './TodoListText';
import { TodoListStatus } from './TodoListStatus';
import { TodoListTags } from './TodoListTags';

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
      mainElement={<TodoListText text={todo.text} />}
      leftElement={<TodoListStatus status={todo.status} />}
      rightElement={<TodoListTags tags={todo.tags} />}
    ></ListItem>
  );
};
