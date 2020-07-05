import React from 'react';

import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { ID } from '../../../viewModels/ID';
import { List } from '../../layout/List';
import { Note } from '../../layout/Note';
import { RelativeDateTimeText } from '../../layout/RelativeDateTimeText';
import { TodoListItem } from './TodoListItem';

type Group = {
  header: { name: string | null; endAt: Date | null; isOld: boolean };
  todos: CategoryTodoFragment[];
};

function isOld(dateString: Date): boolean {
  const currentDate = new Date();
  const date = new Date(dateString);
  return date < currentDate;
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
      const old = isOld(endAt);
      group = { header: { name, endAt, isOld: old }, todos: [] };
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
              header.endAt ? (
                <RelativeDateTimeText value={header.endAt} />
              ) : null
            }
            variant={header.isOld ? 'warning' : undefined}
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
