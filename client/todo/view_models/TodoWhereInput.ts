import { TodoWhereInput } from '../../shared/graphql/__generated__/baseTypes';
import { TodoSearchQuery } from './TodoSearchQuery';

const DEBUG_CHECKPOINT_ID = '_';

export function getTodoWhereInput(
  query: TodoSearchQuery | null
): TodoWhereInput {
  const isRoot = query?.parentId == null;

  return {
    categoryId: query?.categoryId ? { equals: query?.categoryId } : undefined,
    checkpointId:
      query?.checkpointId === DEBUG_CHECKPOINT_ID
        ? undefined
        : query?.checkpointId
        ? { equals: query.checkpointId }
        : isRoot
        ? { not: null }
        : undefined,
    parentId: query?.parentId ? { equals: query.parentId } : undefined,
    archivedAt: query?.archivedAt
      ? { lte: query.archivedAt }
      : { equals: null },
    status: query?.status ?? undefined,
    tags: query?.tagIds?.length
      ? { some: { id: { in: query.tagIds } } }
      : undefined,
    text: query?.text
      ? {
          contains: query.text,
        }
      : undefined,
  };
}
