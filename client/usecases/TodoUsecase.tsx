import { ApolloClient } from '@apollo/client';

import { TodoStatus } from '../graphql/__generated__/baseTypes';
import {
  GetPageDocument,
  GetPageQuery,
} from '../graphql/__generated__/Page.graphql';
import {
  CreateOneTodoDocument,
  CreateOneTodoMutationVariables,
  DeleteTodosByIdDocument,
  DeleteTodosByIdMutationVariables,
  refetchGetTodosQuery,
  UpdateTodosByIdDocument,
  UpdateTodosByIdMutationVariables,
} from '../graphql/__generated__/Todo.graphql';
import { RootTodoFragment } from '../graphql/__generated__/Todo.graphql';
import {
  TodoEditFormAction,
  todoEditFormReset,
  todoEditFormSet,
  TodoEditFormState,
} from '../state/TodoEditFormState';
import { DUMMY_CHECKPOINT } from '../viewModels/Checkpoint';
import { toDateTime } from '../viewModels/DateTime';
import { ID } from '../viewModels/ID';

function getNextStatus(status: TodoStatus): TodoStatus {
  switch (status) {
    case TodoStatus.Todo:
      return TodoStatus.InProgress;
    case TodoStatus.InProgress:
      return TodoStatus.Done;
    case TodoStatus.Waiting:
      return TodoStatus.InProgress;
    case TodoStatus.Done:
      return TodoStatus.Todo;
  }
}

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
      refetchQueries: [refetchGetTodosQuery({ categoryId })],
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

    this.dispatch(todoEditFormSet({ selectedTodoIds: [] }));

    this.writeIsSyncing(true);

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

    this.writeIsSyncing(false);
  }

  async deleteTodosById(categoryId: ID, todoIds: ID[]) {
    const count = todoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    this.dispatch(todoEditFormReset());
    await this.client.mutate<unknown, DeleteTodosByIdMutationVariables>({
      mutation: DeleteTodosByIdDocument,
      variables: { input: { ids: todoIds } },
      refetchQueries: [refetchGetTodosQuery({ categoryId })],
    });
  }

  async toggleStatus(todo: RootTodoFragment) {
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

  async archiveTodosById(categoryId: ID, todoIds: ID[]) {
    await this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
      mutation: UpdateTodosByIdDocument,
      variables: {
        input: {
          ids: todoIds,
          archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [refetchGetTodosQuery({ categoryId })],
    });
  }

  private writeIsSyncing(isSyncing: boolean) {
    this.client.writeQuery<GetPageQuery>({
      query: GetPageDocument,
      data: { page: { __typename: 'Page', isSyncing } },
    });
  }
}
