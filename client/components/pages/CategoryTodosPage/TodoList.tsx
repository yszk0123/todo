import React from 'react';
import { List } from '../../layout/List';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { TodoListItem } from './TodoListItem';
import { ID } from '../../../viewModels/ID';

export const TodoList: React.FunctionComponent<{
  todos: CategoryTodoFragment[];
  selectedTodoIds: ID[];
  onClick: (item: CategoryTodoFragment) => void;
  onClickToggle: (item: CategoryTodoFragment) => void;
}> = ({ todos, selectedTodoIds, onClick, onClickToggle }) => {
  return (
    <List>
      {todos.map((todo) => {
        const isSelected = selectedTodoIds.includes(todo.id);

        return (
          <TodoListItem
            isSelected={isSelected}
            key={todo.id}
            todo={todo}
            onClick={onClick}
            onClickToggle={onClickToggle}
          />
        );
      })}
    </List>
  );
};
