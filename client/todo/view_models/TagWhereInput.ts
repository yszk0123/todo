import { TagWhereInput } from '../../shared/graphql/__generated__/baseTypes';
import { TodoSearchFormValue } from '../ducks/TodoSearchFormDucks';

export function getTagWhereInput(
  todoSearchFormValue: TodoSearchFormValue | null
): TagWhereInput {
  return {
    categories: todoSearchFormValue?.category?.id
      ? { some: { id: { equals: todoSearchFormValue?.category?.id } } }
      : undefined,
    archivedAt: { equals: null },
  };
}
