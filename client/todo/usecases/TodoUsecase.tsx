import { ApolloClient } from '@apollo/client';
import Router from 'next/router';
import { Dispatch } from 'redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../../shared/graphql/__generated__/Page.graphql';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import { getSelectedIds, Selection } from '../../view_models/TodoSelection';
import { todoEditFormValuesSet } from '../ducks/TodoEditFormValuesDucks';
import { TodoSearchFormState } from '../ducks/TodoSearchFormDucks';
import { todoSelectionDeselect } from '../ducks/TodoSelectionDucks';
import {
  CreateOneTodoDocument,
  CreateOneTodoMutationVariables,
  DeleteTodosByIdDocument,
  DeleteTodosByIdMutationVariables,
  refetchGetTodosQuery,
  UpdateTodosByIdDocument,
  UpdateTodosByIdMutationVariables,
} from '../graphql/__generated__/Todo.graphql';
import { TodoEditFormValues } from '../view_models/TodoEditFormValues';
import {
  fromTodoSearchFormState,
  TodoSearchQuery,
} from '../view_models/TodoSearchQuery';
import { getTodoWhereInput } from '../view_models/TodoWhereInput';

function getRefetchQuery(todoSearchQuery: TodoSearchQuery | null) {
  return refetchGetTodosQuery({
    input: getTodoWhereInput(todoSearchQuery),
  });
}

export class TodoUsecase {
  constructor(
    private client: ApolloClient<unknown>,
    private dispatch: Dispatch
  ) {}

  search(todoSearchFormState: Partial<TodoSearchFormState>) {
    const query = fromTodoSearchFormState(todoSearchFormState);
    Router.push({ pathname: '/todos', query }, undefined, { shallow: true });
  }

  async createOneTodo(
    userId: string,
    todoEditFormValues: TodoEditFormValues,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    const { checkpoint, status, tags, text } = todoEditFormValues;
    const newTags = tags ? tags.map((tag) => ({ id: tag.id })) : undefined;
    const categoryIdToCreate =
      todoEditFormValues.category?.id ?? todoSearchQuery?.categoryId ?? null;
    if (categoryIdToCreate === null) {
      alert('CategoryId required');
      return;
    }
    const checkpointIdToCreate =
      checkpoint?.id ?? todoSearchQuery?.checkpointId ?? null;

    this.dispatch(todoEditFormValuesSet({ text: '' }));

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
    { category, checkpoint, status, tags, text }: TodoEditFormValues,
    selection: Selection,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    const selectedTodoIds = getSelectedIds(selection);
    const count = selectedTodoIds.length;
    if (count === 0) return;

    const tagIds = tags ? tags.map((tag) => tag.id) : undefined;

    this.dispatch(todoSelectionDeselect());

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
    this.dispatch(todoSelectionDeselect());
    this.sync(() =>
      this.client.mutate<unknown, DeleteTodosByIdMutationVariables>({
        mutation: DeleteTodosByIdDocument,
        variables: { input: { ids: todoIds } },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  updateStatus(todoIds: ID[], status: TodoStatus) {
    this.dispatch(todoSelectionDeselect());

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            status,
          },
        },
      })
    );
  }

  updateCategory(
    todoIds: ID[],
    category: RootCategoryFragment,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    this.dispatch(todoSelectionDeselect());

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            categoryId: category.id,
          },
        },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  archiveTodosById(todoIds: ID[], todoSearchQuery: TodoSearchQuery | null) {
    this.dispatch(todoSelectionDeselect());

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

  unarchiveTodosById(todoIds: ID[], todoSearchQuery: TodoSearchQuery | null) {
    this.dispatch(todoSelectionDeselect());

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            archivedAt: null,
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
