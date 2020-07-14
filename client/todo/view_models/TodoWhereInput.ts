import { TodoWhereInput } from '../../shared/graphql/__generated__/baseTypes';
import { TodoSearchQuery } from './TodoSearchQuery';

export function getTodoWhereInput(
  query: TodoSearchQuery | null
): TodoWhereInput {
  return {
    categoryId: query?.categoryId ? { equals: query?.categoryId } : undefined,
    checkpointId: query?.checkpointId
      ? { equals: query.checkpointId }
      : undefined,
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
