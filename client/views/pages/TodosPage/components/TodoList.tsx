import React from 'react';

import { RootTodoFragment } from '../../../../graphql/__generated__/Todo.graphql';
import { ID } from '../../../../viewModels/ID';
import { groupTodoByCheckpoint, isPast } from '../../../../viewModels/Todo';
import { List } from '../../../components/List';
import { Note } from '../../../components/Note';
import { RelativeDateTimeText } from '../../../components/RelativeDateTimeText';
import { TodoListItem } from './TodoListItem';

export const TodoList: React.FunctionComponent<{
  now: number;
  onClick: (item: RootTodoFragment) => void;
  onClickStatus: (todo: RootTodoFragment) => void;
  onClickToggle: (item: RootTodoFragment) => void;
  selectedTodoIds: ID[];
  todos: RootTodoFragment[];
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
