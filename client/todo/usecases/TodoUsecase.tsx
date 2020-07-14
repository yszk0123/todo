import { ApolloClient } from '@apollo/client';

import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../../shared/graphql/__generated__/Page.graphql';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import {
  TodoEditFormAction,
  todoEditFormReset,
  todoEditFormSet,
  TodoEditFormState,
} from '../ducks/TodoEditFormDucks';
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
import { TodoSearchQuery } from '../view_models/TodoSearchQuery';
import { getTodoWhereInput } from '../view_models/TodoWhereInput';

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

function getRefetchQuery(todoSearchQuery: TodoSearchQuery | null) {
  return refetchGetTodosQuery({
    input: getTodoWhereInput(todoSearchQuery),
  });
}

export class TodoUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: (action: TodoEditFormAction) => void
  ) {}

  async createOneTodo(
    userId: string,
    todoEditFormState: TodoEditFormState,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    const { checkpoint, status, tags, text } = todoEditFormState;
    const newTags = tags ? tags.map((tag) => ({ id: tag.id })) : undefined;
    const categoryIdToCreate =
      todoEditFormState.category?.id ?? todoSearchQuery?.categoryId ?? null;
    if (categoryIdToCreate === null) {
      alert('CategoryId required');
      return;
    }
    const checkpointIdToCreate =
      checkpoint?.id ?? todoSearchQuery?.checkpointId ?? null;

    this.dispatch(todoEditFormSet({ text: '' }));

    await this.client.mutate<unknown, CreateOneTodoMutationVariables>({
      mutation: CreateOneTodoDocument,
      variables: {
        input: {
          owner: { connect: { id: userId } },
          category: { connect: { id: categoryIdToCreate } },
          tags: newTags ? { connect: newTags } : undefined,
          text,
          status: status ?? todoSearchQuery?.status ?? TodoStatus.Todo,
          checkpoint: checkpointIdToCreate
            ? { connect: { id: checkpointIdToCreate } }
            : undefined,
        },
      },
      refetchQueries: [getRefetchQuery(todoSearchQuery)],
    });
  }

  updateTodosById(
    {
      category,
      checkpoint,
      selectedTodoIds,
      status,
      tags,
      text,
    }: TodoEditFormState,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    const count = selectedTodoIds.length;
    if (count === 0) return;

    const tagIds = tags ? tags.map((tag) => tag.id) : undefined;

    this.dispatch(todoEditFormSet({ selectedTodoIds: [] }));

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: selectedTodoIds,
            categoryId: category?.id ?? undefined,
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
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  deleteTodosById(todoIds: ID[], todoSearchQuery: TodoSearchQuery | null) {
    const count = todoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    this.dispatch(todoEditFormReset());
    this.sync(() =>
      this.client.mutate<unknown, DeleteTodosByIdMutationVariables>({
        mutation: DeleteTodosByIdDocument,
        variables: { input: { ids: todoIds } },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  toggleStatus(todo: RootTodoFragment) {
    const newStatus = getNextStatus(todo.status);

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: [todo.id],
            status: newStatus,
          },
        },
      })
    );
  }

  archiveTodosById(todoIds: ID[], todoSearchQuery: TodoSearchQuery | null) {
    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            archivedAt: toDateTime(new Date()),
          },
        },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  private async sync(callback: () => Promise<unknown>) {
    this.writeIsSyncing(true);
    callback().finally(() => {
      this.writeIsSyncing(false);
    });
  }

  private writeIsSyncing(isSyncing: boolean) {
    this.client.writeQuery<PageIsSyncingQuery>({
      query: PageIsSyncingDocument,
      data: { page: { __typename: 'Page', isSyncing } },
    });
  }
}
