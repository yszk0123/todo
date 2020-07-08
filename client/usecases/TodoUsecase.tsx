import { ApolloClient } from '@apollo/client';

import {
  DUMMY_CHECKPOINT,
  getNextStatus,
} from '../components/pages/CategoryTodosPage/CategoryTodosPage';
import { TodoStatus } from '../graphql/__generated__/baseTypes';
import {
  CreateOneTodoDocument,
  CreateOneTodoMutationVariables,
  DeleteTodosByIdDocument,
  DeleteTodosByIdMutationVariables,
  UpdateTodosByIdDocument,
  UpdateTodosByIdMutationVariables,
} from '../graphql/__generated__/CategoryTodosPage.graphql';
import { CategoryTodoFragment } from '../graphql/fragments/__generated__/CategoryTodo.graphql';
import {
  TodoEditFormAction,
  todoEditFormReset,
  todoEditFormSet,
  TodoEditFormState,
} from '../state/TodoEditFormState';
import { toDateTime } from '../viewModels/DateTime';
import { ID } from '../viewModels/ID';

export class TodoUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: TodoEditFormAction) => void
  ) {}

  async createOneTodo(
    userId: string,
    categoryId: string,
    todoEditFormState: TodoEditFormState
  ) {
    const { checkpoint, status, tags, text } = todoEditFormState;
    const newTags = tags ? tags.map((tag) => ({ id: tag.id })) : undefined;

    this.dispatch(todoEditFormSet({ text: '' }));

    await this.client.mutate<unknown, CreateOneTodoMutationVariables>({
      mutation: CreateOneTodoDocument,
      variables: {
        input: {
          owner: { connect: { id: userId } },
          category: { connect: { id: categoryId } },
          tags: newTags ? { connect: newTags } : undefined,
          text,
          status: status ?? TodoStatus.Todo,
          checkpoint:
            checkpoint && checkpoint !== DUMMY_CHECKPOINT
              ? { connect: { id: checkpoint.id } }
              : undefined,
        },
      },
    });
  }

  async updateTodosById({
    checkpoint,
    selectedTodoIds,
    status,
    tags,
    text,
  }: TodoEditFormState) {
    const count = selectedTodoIds.length;
    if (count === 0) return;

    const tagIds = tags ? tags.map((tag) => tag.id) : undefined;

    await this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
      mutation: UpdateTodosByIdDocument,
      variables: {
        input: {
          ids: selectedTodoIds,
          text: count === 1 ? text : undefined,
          tags: tagIds,
          status: status ? status : undefined,
          checkpointId:
            checkpoint === DUMMY_CHECKPOINT
              ? null
              : checkpoint
              ? checkpoint.id
              : undefined,
        },
      },
    });
  }

  async deleteTodosById(todoIds: ID[]) {
    const count = todoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    this.dispatch(todoEditFormReset());
    await this.client.mutate<unknown, DeleteTodosByIdMutationVariables>({
      mutation: DeleteTodosByIdDocument,
      variables: { input: { ids: todoIds } },
    });
  }

  async toggleStatus(todo: CategoryTodoFragment) {
    const newStatus = getNextStatus(todo.status);

    await this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
      mutation: UpdateTodosByIdDocument,
      variables: {
        input: {
          ids: [todo.id],
          status: newStatus,
        },
      },
    });
  }

  async archiveTodosById(todoIds: ID[]) {
    await this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
      mutation: UpdateTodosByIdDocument,
      variables: {
        input: {
          ids: todoIds,
          archivedAt: toDateTime(new Date()),
        },
      },
    });
  }
}
