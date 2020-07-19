import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
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
