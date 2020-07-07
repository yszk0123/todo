import { TodoStatus } from '../graphql/__generated__/baseTypes';
import { CategoryTodoFragment } from '../graphql/fragments/__generated__/CategoryTodo.graphql';

type Group = {
  header: { endAt: Date | null; name: string | null };
  todos: CategoryTodoFragment[];
};

export function isPast(dateString: Date | null, now: number): boolean {
  if (dateString === null) return false;
  const date = +new Date(dateString);
  return date < now;
}

const statusToIndex = {
  [TodoStatus.InProgress]: 0,
  [TodoStatus.Todo]: 1,
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

export function groupTodoByCheckpoint(todos: CategoryTodoFragment[]): Group[] {
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
    const d1 = a.header.endAt ? new Date(a.header.endAt).getTime() : Infinity;
    const d2 = b.header.endAt ? new Date(b.header.endAt).getTime() : Infinity;
    return d1 - d2;
  });
}
