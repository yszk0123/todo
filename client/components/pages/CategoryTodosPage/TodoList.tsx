import React from 'react';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { Note } from '../../layout/Note';
import { RelativeDateTimeText } from '../../layout/RelativeDateTimeText';
import { TodoListItem } from './TodoListItem';

type Group = {
  header: { endAt: Date | null; name: string | null };
  todos: CategoryTodoFragment[];
};

function isPast(dateString: Date | null, now: number): boolean {
  if (dateString === null) return false;
  const date = +new Date(dateString);
  return date < now;
}

const statusToIndex = {
  [TodoStatus.Todo]: 0,
  [TodoStatus.InProgress]: 1,
  [TodoStatus.Waiting]: 2,
  [TodoStatus.Done]: 3,
};

const TIME_RE = /^(\d{2}:\d{2})[-~]/;

function getTime(text: string): number {
  const match = TIME_RE.exec(text);
  return match && match[1] ? Number(match[1].replace(/:/, '')) : 0;
}

function sortTodosByContent(
  todos: CategoryTodoFragment[]
): CategoryTodoFragment[] {
  return [...todos].sort((a, b) => {
    const time = getTime(a.text) - getTime(b.text);
    if (time !== 0) return time;
    const status = statusToIndex[a.status] - statusToIndex[b.status];
    return status;
  });
}

function groupByCheckpoint(todos: CategoryTodoFragment[]): Group[] {
  const groupsById: Record<string, Group> = {};

  sortTodosByContent(todos).forEach((todo) => {
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
  const groups = React.useMemo(() => groupByCheckpoint(todos), [todos]);

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
