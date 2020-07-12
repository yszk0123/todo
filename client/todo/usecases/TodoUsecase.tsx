import { ApolloClient } from '@apollo/client';

import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../../shared/graphql/__generated__/Page.graphql';
import { DUMMY_CHECKPOINT } from '../../viewModels/Checkpoint';
import { toDateTime } from '../../viewModels/DateTime';
import { ID } from '../../viewModels/ID';
import {
  TodoEditFormAction,
  todoEditFormReset,
  todoEditFormSet,
  TodoEditFormState,
} from '../ducks/TodoEditFormDucks';
import { TodoSearchFormValue } from '../ducks/TodoSearchFormDucks';
import {
  CreateOneTodoDocument,
  CreateOneTodoMutationVariables,
  DeleteTodosByIdDocument,
  DeleteTodosByIdMutationVariables,
  GetTodosQueryVariables,
  refetchGetTodosQuery,
  UpdateTodosByIdDocument,
  UpdateTodosByIdMutationVariables,
} from '../graphql/__generated__/Todo.graphql';
import { RootTodoFragment } from '../graphql/__generated__/Todo.graphql';

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

function getQueryVariables(
  todoSearchFormValue: TodoSearchFormValue | null
): GetTodosQueryVariables {
  return {
    input: {
      categoryId: todoSearchFormValue?.category?.id
        ? { equals: todoSearchFormValue?.category?.id }
        : undefined,
      archivedAt: { equals: null },
      status: todoSearchFormValue?.status ?? undefined,
      tags: todoSearchFormValue?.tags?.length
        ? { some: { id: { in: todoSearchFormValue.tags.map((t) => t.id) } } }
        : undefined,
      text: todoSearchFormValue?.text
        ? {
            contains: todoSearchFormValue.text,
          }
        : undefined,
    },
  };
}

export class TodoUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: TodoEditFormAction) => void
  ) {}

  async createOneTodo(
    userId: string,
    todoEditFormState: TodoEditFormState,
    todoSearchFormValue: TodoSearchFormValue | null
  ) {
    const { checkpoint, status, tags, text } = todoEditFormState;
    const newTags = tags ? tags.map((tag) => ({ id: tag.id })) : undefined;
    const categoryIdToCreate =
      todoEditFormState.category?.id ??
      todoSearchFormValue?.category?.id ??
      null;
    if (categoryIdToCreate === null) {
      alert('CategoryId required');
      return;
    }
    const checkpointToCreate =
      checkpoint ?? todoSearchFormValue?.checkpoint ?? null;

    this.dispatch(todoEditFormSet({ text: '' }));

    await this.client.mutate<unknown, CreateOneTodoMutationVariables>({
      mutation: CreateOneTodoDocument,
      variables: {
        input: {
          owner: { connect: { id: userId } },
          category: { connect: { id: categoryIdToCreate } },
          tags: newTags ? { connect: newTags } : undefined,
          text,
          status: status ?? todoSearchFormValue?.status ?? TodoStatus.Todo,
          checkpoint:
            checkpointToCreate && checkpointToCreate !== DUMMY_CHECKPOINT
              ? { connect: { id: checkpointToCreate.id } }
              : undefined,
        },
      },
      refetchQueries: [
        refetchGetTodosQuery(getQueryVariables(todoSearchFormValue)),
      ],
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

  async deleteTodosById(
    todoIds: ID[],
    todoSearchFormValue: TodoSearchFormValue | null
  ) {
    const count = todoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    this.dispatch(todoEditFormReset());
    await this.client.mutate<unknown, DeleteTodosByIdMutationVariables>({
      mutation: DeleteTodosByIdDocument,
      variables: { input: { ids: todoIds } },
      refetchQueries: [
        refetchGetTodosQuery(getQueryVariables(todoSearchFormValue)),
      ],
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

  async archiveTodosById(
    todoIds: ID[],
    todoSearchFormValue: TodoSearchFormValue | null
  ) {
    await this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
      mutation: UpdateTodosByIdDocument,
      variables: {
        input: {
          ids: todoIds,
          archivedAt: toDateTime(new Date()),
        },
      },
      refetchQueries: [
        refetchGetTodosQuery(getQueryVariables(todoSearchFormValue)),
      ],
    });
  }

  private writeIsSyncing(isSyncing: boolean) {
    this.client.writeQuery<PageIsSyncingQuery>({
      query: PageIsSyncingDocument,
      data: { page: { __typename: 'Page', isSyncing } },
    });
  }
}
