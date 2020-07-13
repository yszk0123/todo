import { TodoWhereInput } from '../../shared/graphql/__generated__/baseTypes';
import { TodoSearchFormValue } from '../ducks/TodoSearchFormDucks';

export function getTodoWhereInput(
  todoSearchFormValue: TodoSearchFormValue | null
): TodoWhereInput {
  return {
    categoryId: todoSearchFormValue?.category?.id
      ? { equals: todoSearchFormValue?.category?.id }
      : undefined,
    checkpointId: todoSearchFormValue?.checkpoint?.id
      ? { equals: todoSearchFormValue.checkpoint.id }
      : undefined,
    archivedAt: todoSearchFormValue?.archivedAt
      ? { lte: todoSearchFormValue.archivedAt }
      : { equals: null },
    status: todoSearchFormValue?.status ?? undefined,
    tags: todoSearchFormValue?.tags?.length
      ? { some: { id: { in: todoSearchFormValue.tags.map((t) => t.id) } } }
      : undefined,
    text: todoSearchFormValue?.text
      ? {
          contains: todoSearchFormValue.text,
        }
      : undefined,
  };
}
