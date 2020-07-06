import Head from 'next/head';
import React from 'react';

import {
  DeleteTodosByIdInput,
  TodoCreateInput,
  TodoStatus,
  UpdateTodosByIdInput,
} from '../../../graphql/__generated__/baseTypes';
import {
  useCategoryTodosPageQuery,
  useCreateOneTodoMutation,
  useDeleteTodosByIdMutation,
  useUpdateTodosByIdMutation,
} from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import { ID } from '../../../viewModels/ID';
import { SelectMode } from '../../../viewModels/SelectMode';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TodoEditForm } from './TodoEditForm';
import {
  todoEditFormInitialState,
  todoEditFormReducer,
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSelectOne,
  todoEditFormSet,
  todoEditFormToggleTag,
} from './TodoEditFormState';
import { TodoList } from './TodoList';
import { TodoStatusBar } from './TodoStatusBar';

export function first<T>(values: T[]): T | undefined {
  return values[0];
}

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

// FIXME
const DUMMY_CHECKPOINT: RootCheckpointFragment = {
  id: '__DUMMY__',
  name: 'RESET',
  endAt: null,
};

type Props = {
  categoryId: ID;
};

export const CategoryTodosPage: React.FunctionComponent<Props> = ({
  categoryId,
}) => {
  const { data, loading, refetch } = useCategoryTodosPageQuery({
    variables: { categoryId },
    fetchPolicy: 'cache-and-network',
  });
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneTodo] = useCreateOneTodoMutation({
    onCompleted: handleCompleted,
  });
  const [updateTodosById] = useUpdateTodosByIdMutation({
    onCompleted: handleCompleted,
  });
  const [deleteTodosById] = useDeleteTodosByIdMutation({
    onCompleted: handleCompleted,
  });

  const [
    { checkpoint, selectedTodoIds, status, tags, text },
    dispatch,
  ] = React.useReducer(todoEditFormReducer, todoEditFormInitialState);

  const deselect = React.useCallback(() => {
    dispatch(todoEditFormReset());
  }, []);

  const handleSelectOneTodo = React.useCallback(
    (todo: CategoryTodoFragment) => {
      dispatch(todoEditFormSelectOne(todo));
    },
    []
  );

  const handleSelectManyTodo = React.useCallback(
    (todo: CategoryTodoFragment) => {
      dispatch(todoEditFormSelectMany(todo));
    },
    []
  );

  const handleDeselectTodo = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneTodo = React.useCallback(() => {
    if (data?.me) {
      const newTags = tags ? tags.map((tag) => ({ id: tag.id })) : undefined;
      const input: TodoCreateInput = {
        owner: { connect: { id: data.me.id } },
        category: { connect: { id: categoryId } },
        tags: newTags ? { connect: newTags } : undefined,
        text,
        status: status ?? TodoStatus.Todo,
        checkpoint:
          checkpoint && checkpoint !== DUMMY_CHECKPOINT
            ? { connect: { id: checkpoint.id } }
            : undefined,
      };
      createOneTodo({ variables: { input } });
    }
  }, [data?.me, tags, categoryId, text, status, checkpoint, createOneTodo]);

  const handleDeleteTodosById = React.useCallback(() => {
    const count = selectedTodoIds.length;
    if (count === 0) return;
    if (!confirm(`Delete ${count} items?`)) return;
    const input: DeleteTodosByIdInput = { ids: selectedTodoIds };
    deselect();
    deleteTodosById({ variables: { input } });
  }, [deselect, deleteTodosById, selectedTodoIds]);

  const handleUpdateTodosById = React.useCallback(() => {
    const count = selectedTodoIds.length;
    if (count === 0) return;
    const tagIds = tags ? tags.map((tag) => tag.id) : undefined;
    const input: UpdateTodosByIdInput = {
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
    };
    updateTodosById({ variables: { input } });
  }, [selectedTodoIds, tags, text, status, checkpoint, updateTodosById]);

  const handleToggleStatus = React.useCallback(
    (todo: CategoryTodoFragment) => {
      const newStatus = getNextStatus(todo.status);
      const input: UpdateTodosByIdInput = {
        ids: [todo.id],
        status: newStatus,
      };
      updateTodosById({ variables: { input } });
    },
    [updateTodosById]
  );

  const handleArchiveTodosById = React.useCallback(() => {
    if (selectedTodoIds.length === 0) return;
    const input: UpdateTodosByIdInput = {
      ids: selectedTodoIds,
      archivedAt: new Date(),
    };
    updateTodosById({ variables: { input } });
  }, [selectedTodoIds, updateTodosById]);

  const handleToggleTag = React.useCallback((tag: CategoryTagFragment) => {
    dispatch(todoEditFormToggleTag(tag));
  }, []);

  const handleChangeText = React.useCallback((text: string) => {
    dispatch(todoEditFormSet({ text }));
  }, []);

  const handleSelectStatus = React.useCallback((status: TodoStatus) => {
    dispatch(todoEditFormSet({ status }));
  }, []);

  const handleSelectCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoEditFormSet({ checkpoint }));
    },
    []
  );

  const checkpointsWithDummy = React.useMemo(
    () => [DUMMY_CHECKPOINT, ...(data?.checkpoints ?? [])],
    [data?.checkpoints]
  );

  React.useEffect(
    () => {
      deselect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId]
  );

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const categoryName = data.category?.name ?? null;
  const todos = data.category?.todos ?? [];
  const categoryTags = data.category?.tags ?? [];
  const categories = data.categories ?? [];
  const count = selectedTodoIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  return (
    <PageContent onClick={handleDeselectTodo}>
      {categoryName && (
        <Head>
          <title>{categoryName}</title>
        </Head>
      )}
      <TodoStatusBar
        categories={categories}
        categoryId={categoryId}
        categoryName={categoryName}
        count={todos.length}
      />
      <TodoList
        selectedTodoIds={selectedTodoIds}
        todos={todos}
        onClick={handleSelectOneTodo}
        onClickStatus={handleToggleStatus}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categoryTags={categoryTags}
        checkpoint={checkpoint}
        checkpoints={checkpointsWithDummy}
        selectMode={selectMode}
        status={status}
        tags={tags}
        text={text}
        onArchiveTodo={handleArchiveTodosById}
        onChangeText={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectCheckpoint={handleSelectCheckpoint}
        onSelectStatus={handleSelectStatus}
        onToggleTag={handleToggleTag}
        onUpdateOneTodo={handleUpdateTodosById}
      />
    </PageContent>
  );
};
