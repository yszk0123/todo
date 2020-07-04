import React from 'react';
import { List } from '../../layout/List';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { TodoListItem } from './TodoListItem';
import { ID } from '../../../viewModels/ID';

export const TodoList: React.FunctionComponent<{
  todos: CategoryTodoFragment[];
  currentTodoId: ID | null;
  onClick: (item: CategoryTodoFragment) => void;
}> = ({ todos, currentTodoId, onClick }) => {
  return (
    <List>
      {todos.map((todo) => {
        return (
          <TodoListItem
            key={todo.id}
            todo={todo}
            isActive={todo.id === currentTodoId}
            onClick={onClick}
          />
        );
      })}
    </List>
  );
};
