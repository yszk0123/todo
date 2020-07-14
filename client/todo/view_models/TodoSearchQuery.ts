import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { DateTime, toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import { TodoSearchFormValue } from '../ducks/TodoSearchFormDucks';

export type TodoSearchQuery = {
  archivedAt: DateTime | null;
  categoryId: ID | null;
  checkpointId: ID | null;
  status: TodoStatus | null;
  tagIds: ID[] | null;
  text: string | null;
};

const stringToTodoStatusMap: Record<string, TodoStatus | undefined> = {
  [TodoStatus.Todo]: TodoStatus.Todo,
  [TodoStatus.InProgress]: TodoStatus.InProgress,
  [TodoStatus.Waiting]: TodoStatus.Waiting,
  [TodoStatus.Done]: TodoStatus.Done,
};

export function fromTodoSearchFormValue(
  value: Partial<TodoSearchFormValue> | null
): TodoSearchQuery {
  const archivedAt = value?.archivedAt ?? null;
  const categoryId = value?.category?.id ?? null;
  const checkpointId = value?.checkpoint?.id ?? null;
  const status = value?.status ?? null;
  const tagIds = value?.tags?.map((tag) => tag.id) ?? null;
  const text = value?.text ?? null;
  return {
    archivedAt,
    categoryId,
    checkpointId,
    status,
    tagIds,
    text,
  };
}

export function parseTodoSearchRawQuery(
  query: Record<string, string | string[] | undefined>
): TodoSearchQuery {
  const archivedAt =
    typeof query.archivedAt === 'string' && query.archivedAt !== ''
      ? toDateTime(query.archivedAt)
      : null;
  const categoryId =
    typeof query.categoryId === 'string' && query.categoryId !== ''
      ? query.categoryId
      : null;
  const checkpointId =
    typeof query.checkpointId === 'string' && query.checkpointId !== ''
      ? query.checkpointId
      : null;
  const status =
    typeof query.status === 'string' && query.status !== ''
      ? stringToTodoStatusMap[query.status] ?? null
      : null;
  const tagIds = Array.isArray(query.tagIds)
    ? query.tagIds
    : typeof query.tagIds === 'string' && query.tagIds !== ''
    ? [query.tagIds]
    : null;
  const text = typeof query.text === 'string' ? query.text : null;

  return {
    archivedAt,
    categoryId,
    checkpointId,
    status,
    tagIds,
    text,
  };
}
