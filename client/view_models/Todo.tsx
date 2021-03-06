import { TodoStatus } from '../shared/graphql/__generated__/baseTypes';
import {
  RootTodoFragment,
  TodoCheckpointFragment,
  TodoTagFragment,
} from '../todo/graphql/__generated__/Todo.graphql';
import { TodoSearchQuery } from '../todo/view_models/TodoSearchQuery';
import { DateTime, parseDateTime } from './DateTime';

export enum TodoArchiveStatus {
  ARCHIVED,
  UNARCHIVED,
  MIXED,
}

export function getArchiveStatus(todos: RootTodoFragment[]): TodoArchiveStatus {
  const count = todos.length;
  if (count === 0) return TodoArchiveStatus.MIXED;

  const archivedCount = todos.filter((todo) => todo.archivedAt != null).length;
  return count === archivedCount
    ? TodoArchiveStatus.ARCHIVED
    : archivedCount === 0
    ? TodoArchiveStatus.UNARCHIVED
    : TodoArchiveStatus.MIXED;
}

export type TodoGroup = {
  checkpoint: TodoCheckpointFragment | null;
  header: { endAt: DateTime | null; name: string | null };
  isParent: boolean;
  todos: RootTodoFragment[];
};

export function isPast(dateString: DateTime | null, now: number): boolean {
  if (dateString === null) return false;
  const date = +parseDateTime(dateString);
  return date < now;
}

const statusToIndex = {
  [TodoStatus.Comment]: 0,
  [TodoStatus.InProgress]: 1,
  [TodoStatus.Todo]: 2,
  [TodoStatus.Waiting]: 3,
  [TodoStatus.Done]: 4,
};

const TIME_RE = /^(?:\*\s+)?(\d{2}:\d{2})[-~]/;

function getTime(text: string): number {
  const match = TIME_RE.exec(text);
  return match && match[1] ? Number(match[1].replace(/:/, '')) : 0;
}

function compareTags(a: TodoTagFragment[], b: TodoTagFragment[]): number {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i += 1) {
    const name = a[i].name.localeCompare(b[i].name);
    if (name !== 0) return name;
  }
  return a.length - b.length;
}

function sortTodosByContent(todos: RootTodoFragment[]): RootTodoFragment[] {
  return [...todos].sort((a, b) => {
    const time = getTime(a.text) - getTime(b.text);
    if (time !== 0) return time;
    const status = statusToIndex[a.status] - statusToIndex[b.status];
    if (status !== 0) return status;
    const name = a.category.name.localeCompare(b.category.name);
    if (name !== 0) return name;
    return compareTags(a.tags, b.tags);
  });
}

export function groupTodoByCheckpoint(
  todos: RootTodoFragment[],
  query: TodoSearchQuery
): TodoGroup[] {
  const parentId = query.parentId;
  const groupsById: Record<string, TodoGroup> = {};
  let archivedCount = 0;

  sortTodosByContent(todos).forEach((todo) => {
    if (todo.archivedAt != null) {
      archivedCount += 1;
    }

    const key =
      todo.id === parentId
        ? '__PARENT__'
        : todo.checkpoint?.id ?? '__DEFAULT__';
    let group = groupsById[key];
    if (!group) {
      const name = todo.checkpoint?.name ?? null;
      const endAt = todo.checkpoint?.endAt ?? null;
      group = {
        isParent: todo.id === parentId,
        header: { name, endAt },
        todos: [],
        checkpoint: todo.checkpoint ?? null,
      };
    }
    group.todos.push(todo);
    groupsById[key] = group;
  });

  const shouldBeReversed = archivedCount >= todos.length / 2;
  const defaultTime = shouldBeReversed ? -Infinity : Infinity;

  const groups = Object.values(groupsById);
  const todoGroups = groups
    .filter((g) => !g.isParent)
    .sort((a, b) => {
      const d1 = a.header.endAt
        ? parseDateTime(a.header.endAt).getTime()
        : defaultTime;
      const d2 = b.header.endAt
        ? parseDateTime(b.header.endAt).getTime()
        : defaultTime;
      return d1 - d2;
    });
  const parentGroup = groups.find((g) => g.isParent);

  if (shouldBeReversed) {
    todoGroups.reverse();
    todoGroups.forEach((group) => {
      group.todos.reverse();
    });
  }

  return parentGroup ? [parentGroup, ...todoGroups] : todoGroups;
}

export function sortTodoTags(tags: TodoTagFragment[]): TodoTagFragment[] {
  return [...tags].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}
