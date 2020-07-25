import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { shallowEqual } from '../../shared/helpers/shallowEqual';
import {
  RootTodoFragment,
  TodoTagFragment,
} from '../graphql/__generated__/Todo.graphql';

export type TodoEditFormValues = {
  category: RootCategoryFragment | null;
  checkpoint: RootCheckpointFragment | null;
  status: TodoStatus | null;
  tags: TodoTagFragment[] | null;
  text: string;
};

export function getTodoEditFormValues(
  todo: RootTodoFragment
): TodoEditFormValues {
  return {
    category: todo.category,
    checkpoint: todo.checkpoint ?? null,
    status: todo.status,
    tags: todo.tags,
    text: todo.text,
  };
}

function isEqual<T>(a: T, b: T): boolean {
  return a === b;
}

function allSameOrNull<T, S>(
  items: T[],
  get: (item: T) => S,
  isEqualFn: (a: S, b: S) => boolean = isEqual
): S | null {
  if (items.length === 0) return null;
  const first = get(items[0]);
  for (let i = 1; i < items.length; i += 1) {
    const v = get(items[i]);
    if (!isEqualFn(first, v)) return null;
  }
  return first;
}

export function getTodoEditFormValuesFromTodos(
  todos: RootTodoFragment[]
): TodoEditFormValues {
  return {
    category: allSameOrNull(todos, (todo) => todo.category),
    checkpoint: allSameOrNull(todos, (todo) => todo.checkpoint) ?? null,
    status: allSameOrNull(todos, (todo) => todo.status),
    tags: allSameOrNull(todos, (todo) => todo.tags, shallowEqual),
    text: '',
  };
}
