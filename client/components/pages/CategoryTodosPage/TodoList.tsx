import React from 'react';

import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ID } from '../../../viewModels/ID';
import { groupTodoByCheckpoint, isPast } from '../../../viewModels/Todo';
import { List } from '../../layout/List';
import { Note } from '../../layout/Note';
import { RelativeDateTimeText } from '../../layout/RelativeDateTimeText';
import { TodoListItem } from './TodoListItem';

export const TodoList: React.FunctionComponent<{
  now: number;
  onClick: (item: CategoryTodoFragment) => void;
  onClickStatus: (todo: CategoryTodoFragment) => void;
  onClickToggle: (item: CategoryTodoFragment) => void;
  selectedTodoIds: ID[];
  todos: CategoryTodoFragment[];
}> = ({
  now,
  onClick,
  onClickStatus,
  onClickToggle,
  selectedTodoIds,
  todos,
}) => {
  const groups = React.useMemo(() => groupTodoByCheckpoint(todos), [todos]);

  return (
    <>
      {groups.map((group, i) => {
        const header = group.header;
        const todos = group.todos;
        const past = isPast(header.endAt, now);

        return (
          <List
            key={`${header.name}-${i}`}
            leftElement={header.name ? <Note text={header.name} /> : null}
            rightElement={
              header.endAt ? (
                <RelativeDateTimeText now={now} value={header.endAt} />
              ) : null
            }
            variant={past ? 'warning' : undefined}
          >
            {todos.map((todo) => {
              const isSelected = selectedTodoIds.includes(todo.id);

              return (
                <TodoListItem
                  isSelected={isSelected}
                  key={todo.id}
                  todo={todo}
                  onClick={onClick}
                  onClickStatus={onClickStatus}
                  onClickToggle={onClickToggle}
                />
              );
            })}
          </List>
        );
      })}
    </>
  );
};
