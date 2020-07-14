import { TagWhereInput } from '../../shared/graphql/__generated__/baseTypes';
import { TodoSearchQuery } from './TodoSearchQuery';

export function getTagWhereInput(query: TodoSearchQuery | null): TagWhereInput {
  return {
    categories: query?.categoryId
      ? { some: { id: { equals: query.categoryId } } }
      : undefined,
    archivedAt: { equals: null },
  };
}
