import React from 'react';

import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ID } from '../../../viewModels/ID';
import { DateTimeText } from '../../layout/DateTimeText';
import { List } from '../../layout/List';
import { Note } from '../../layout/Note';
import { TodoListItem } from './TodoListItem';

type Group = {
  header: { name: string | null; endAt: Date | null };
  todos: CategoryTodoFragment[];
};

function groupByCheckpoint(todos: CategoryTodoFragment[]): Group[] {
  const groupsById: Record<string, Group> = {};

  todos.forEach((todo) => {
    const key = todo.checkpoint?.id ?? '__DEFAULT__';
    let group = groupsById[key];
    if (!group) {
      const name = todo.checkpoint?.name ?? null;
      const endAt = todo.checkpoint?.endAt ?? null;
      group = { header: { name, endAt }, todos: [] };
    }
    group.todos.push(todo);
    groupsById[key] = group;
  });

  return Object.values(groupsById).sort((a, b) => {
    const d1 = a.header.endAt ? new Date(a.header.endAt).getTime() : 0;
    const d2 = b.header.endAt ? new Date(b.header.endAt).getTime() : 0;
    return d1 - d2;
  });
}

export const TodoList: React.FunctionComponent<{
  todos: CategoryTodoFragment[];
  selectedTodoIds: ID[];
  onClick: (item: CategoryTodoFragment) => void;
  onClickToggle: (item: CategoryTodoFragment) => void;
}> = ({ todos, selectedTodoIds, onClick, onClickToggle }) => {
  const groups = React.useMemo(() => groupByCheckpoint(todos), [todos]);

  return (
    <>
      {groups.map((group, i) => {
        const header = group.header;
        const todos = group.todos;

        return (
          <List
            key={`${header.name}-${i}`}
            leftElement={header.name ? <Note text={header.name} /> : null}
            rightElement={
              header.endAt ? <DateTimeText value={header.endAt} /> : null
            }
          >
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
      })}
    </>
  );
};
