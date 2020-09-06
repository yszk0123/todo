import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { DateTime, toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import { TodoSearchFormValues } from './TodoSearchFormValues';

export type TodoSearchQuery = {
  archivedAt: DateTime | null;
  categoryId: ID | null;
  checkpointId: ID | null;
  parentId: ID | null;
  status: TodoStatus | null;
  tagIds: ID[] | null;
  text: string | null;
};

const stringToTodoStatusMap: Record<string, TodoStatus | undefined> = {
  [TodoStatus.Todo]: TodoStatus.Todo,
  [TodoStatus.InProgress]: TodoStatus.InProgress,
  [TodoStatus.Waiting]: TodoStatus.Waiting,
  [TodoStatus.Done]: TodoStatus.Done,
  [TodoStatus.Comment]: TodoStatus.Comment,
};

export function fromTodoSearchFormValues(
  value: Partial<TodoSearchFormValues> | null,
  query?: TodoSearchQuery
): TodoSearchQuery {
  const archivedAt =
    (value?.archivedAt !== undefined ? value?.archivedAt : query?.archivedAt) ??
    null;
  const categoryId =
    (value?.category !== undefined ? value?.category?.id : query?.categoryId) ??
    null;
  const checkpointId =
    (value?.checkpoint !== undefined
      ? value?.checkpoint?.id
      : query?.checkpointId) ?? null;
  const parentId =
    (value?.parentId !== undefined ? value?.parentId : query?.parentId) ?? null;
  const status =
    (value?.status !== undefined ? value?.status : query?.status) ?? null;
  const tagIds =
    (value?.tags !== undefined
      ? value?.tags?.map((tag) => tag.id)
      : query?.tagIds) ?? null;
  const text = (value?.text !== undefined ? value?.text : query?.text) ?? null;
  return {
    archivedAt,
    categoryId,
    checkpointId,
    parentId,
    status,
    tagIds,
    text,
  };
}

function toDateTimeOrNull(dateString: string): DateTime | null {
  try {
    return toDateTime(dateString);
  } catch {
    return null;
  }
}

function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value !== '' && value !== 'null';
}

function parseArrayString(value: string): string[] {
  return value.split(',');
}

export function parseTodoSearchRawQuery(
  query: Record<string, string | string[] | undefined>
): TodoSearchQuery {
  const archivedAt = isValidString(query.archivedAt)
    ? toDateTimeOrNull(query.archivedAt)
    : null;
  const categoryId = isValidString(query.categoryId) ? query.categoryId : null;
  const checkpointId = isValidString(query.checkpointId)
    ? query.checkpointId
    : null;
  const parentId = isValidString(query.parentId) ? query.parentId : null;
  const status = isValidString(query.status)
    ? stringToTodoStatusMap[query.status] ?? null
    : null;
  const tagIds = Array.isArray(query.tagIds)
    ? query.tagIds
    : isValidString(query.tagIds)
    ? parseArrayString(query.tagIds)
    : null;
  // FIXME: currently cannot search "null"
  const text = isValidString(query.text) ? query.text : null;

  return {
    archivedAt,
    categoryId,
    checkpointId,
    parentId,
    status,
    tagIds,
    text,
  };
}
