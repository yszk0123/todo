import { ApolloClient } from '@apollo/client';
import Router from 'next/router';
import { Dispatch } from 'redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import {
  PageIsSyncingDocument,
  PageIsSyncingQuery,
} from '../../shared/graphql/__generated__/Page.graphql';
import { toggle } from '../../shared/helpers/toggle';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { toDateTime } from '../../view_models/DateTime';
import { ID } from '../../view_models/ID';
import { getSelectedIds, Selection } from '../../view_models/Selection';
import { todoEditFormSet } from '../ducks/TodoEditFormDucks';
import {
  todoSelectionDeselect,
  todoSelectionSelectByIds,
} from '../ducks/TodoSelectionDucks';
import {
  CreateOneTodoDocument,
  CreateOneTodoMutationVariables,
  DeleteTodosByIdDocument,
  DeleteTodosByIdMutationVariables,
  DuplicateTodosByIdDocument,
  DuplicateTodosByIdMutationVariables,
  refetchGetTodosQuery,
  TodoTagFragment,
  UpdateTodosByIdDocument,
  UpdateTodosByIdMutationVariables,
} from '../graphql/__generated__/Todo.graphql';
import { TodoEditFormValues } from '../view_models/TodoEditFormValues';
import { TodoSearchFormValues } from '../view_models/TodoSearchFormValues';
import {
  fromTodoSearchFormValues,
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

  search(
    todoSearchFormValues: Partial<TodoSearchFormValues>,
    todoSearchQuery?: TodoSearchQuery
  ) {
    const query = fromTodoSearchFormValues(
      todoSearchFormValues,
      todoSearchQuery
    );
    Router.push({ pathname: '/todos', query }, undefined, { shallow: true });
  }

  searchToggleTag(tag: TodoTagFragment, todoSearchQuery: TodoSearchQuery) {
    const query = { ...todoSearchQuery };
    query.tagIds = toggle(query.tagIds ?? [], tag.id);
    Router.push({ pathname: '/todos', query }, undefined, { shallow: true });
  }

  searchToggleStatus(
    status: TodoStatus | null,
    todoSearchQuery: TodoSearchQuery
  ) {
    const query = { ...todoSearchQuery };
    query.status = query.status === status ? null : status;
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

  duplicateTodosById(todoIds: ID[], todoSearchQuery: TodoSearchQuery | null) {
    const count = todoIds.length;
    if (count === 0) return;
    if (!confirm(`Duplicate ${count} items?`)) return;
    this.dispatch(todoSelectionDeselect());
    this.sync(async () => {
      await this.client.mutate<unknown, DuplicateTodosByIdMutationVariables>({
        mutation: DuplicateTodosByIdDocument,
        variables: { input: { ids: todoIds } },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      });
      this.dispatch(todoSelectionSelectByIds(todoIds));
    });
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

  updateCheckpoint(
    todoIds: ID[],
    checkpoint: RootCheckpointFragment,
    todoSearchQuery: TodoSearchQuery | null
  ) {
    this.dispatch(todoSelectionDeselect());

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            checkpointId: checkpoint.id,
          },
        },
        refetchQueries: [getRefetchQuery(todoSearchQuery)],
      })
    );
  }

  updateTagToggle(
    todoIds: ID[],
    tags: TodoTagFragment[],
    todoSearchQuery: TodoSearchQuery | null
  ) {
    this.dispatch(todoSelectionDeselect());
    const tagIds = tags.map((tag) => tag.id);

    this.sync(() =>
      this.client.mutate<unknown, UpdateTodosByIdMutationVariables>({
        mutation: UpdateTodosByIdDocument,
        variables: {
          input: {
            ids: todoIds,
            tags: tagIds,
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
