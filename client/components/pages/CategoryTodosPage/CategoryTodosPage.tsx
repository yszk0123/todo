import { useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React from 'react';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { useCategoryTodosPageQuery } from '../../../graphql/__generated__/CategoryTodosPage.graphql';
import { CategoryTagFragment } from '../../../graphql/fragments/__generated__/CategoryTag.graphql';
import { CategoryTodoFragment } from '../../../graphql/fragments/__generated__/CategoryTodo.graphql';
import { RootCheckpointFragment } from '../../../graphql/fragments/__generated__/RootCheckpoint.graphql';
import {
  todoEditFormInitialState,
  todoEditFormReducer,
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSelectOne,
  todoEditFormSet,
  todoEditFormToggleTag,
} from '../../../state/TodoEditFormState';
import { TodoUsecase } from '../../../usecases/TodoUsecase';
import { ID } from '../../../viewModels/ID';
import { SelectMode } from '../../../viewModels/SelectMode';
import isDocumentVisible from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TodoEditForm } from './TodoEditForm';
import { TodoList } from './TodoList';
import { TodoStatusBar } from './TodoStatusBar';

export function first<T>(values: T[]): T | undefined {
  return values[0];
}

export function getNextStatus(status: TodoStatus): TodoStatus {
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
export const DUMMY_CHECKPOINT: RootCheckpointFragment = {
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
  const client = useApolloClient();
  const [todoEditFormState, dispatch] = React.useReducer(
    todoEditFormReducer,
    todoEditFormInitialState
  );
  const [todoUsecase] = React.useState(() => new TodoUsecase(client, dispatch));
  const { checkpoint, selectedTodoIds, status, tags, text } = todoEditFormState;
  const userId = data?.me?.id;
  const [now, setNow] = React.useState(() => Date.now());

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
    dispatch(todoEditFormReset());
  }, []);

  const handleCreateOneTodo = React.useCallback(async () => {
    if (!userId) return;
    await todoUsecase.createOneTodo(userId, categoryId, todoEditFormState);
    await refetch();
  }, [categoryId, refetch, todoEditFormState, todoUsecase, userId]);

  const handleDeleteTodosById = React.useCallback(async () => {
    await todoUsecase.deleteTodosById(selectedTodoIds);
    await refetch();
  }, [refetch, selectedTodoIds, todoUsecase]);

  const handleUpdateTodosById = React.useCallback(() => {
    todoUsecase.updateTodosById(todoEditFormState);
  }, [todoEditFormState, todoUsecase]);

  const handleToggleStatus = React.useCallback(
    (todo: CategoryTodoFragment) => {
      todoUsecase.toggleStatus(todo);
    },
    [todoUsecase]
  );

  const handleArchiveTodosById = React.useCallback(() => {
    todoUsecase.archiveTodosById(selectedTodoIds);
  }, [selectedTodoIds, todoUsecase]);

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

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  React.useEffect(
    () => {
      dispatch(todoEditFormReset());
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
        now={now}
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
