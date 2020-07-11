import { useApolloClient } from '@apollo/client';
import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { TodoStatus } from '../../../graphql/__generated__/baseTypes';
import { RootCheckpointFragment } from '../../../graphql/__generated__/Checkpoint.graphql';
import { usePageIsSyncingQuery } from '../../../graphql/__generated__/Page.graphql';
import { RootTodoFragment } from '../../../graphql/__generated__/Todo.graphql';
import { TodoTagFragment } from '../../../graphql/__generated__/Todo.graphql';
import { useTodosPageQuery } from '../../../graphql/__generated__/TodosPage.graphql';
import { useTypedSelector } from '../../../redux/useTypedSelector';
import {
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSelectOne,
  todoEditFormSet,
  TodoEditFormState,
  todoEditFormToggleTag,
} from '../../../state/TodoEditFormState';
import { TodoUsecase } from '../../../usecases/TodoUsecase';
import { DUMMY_CHECKPOINT } from '../../../viewModels/Checkpoint';
import { ID } from '../../../viewModels/ID';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TodoEditForm } from './TodoEditForm';
import { TodoList } from './TodoList';
import { TodoStatusBar } from './TodoStatusBar';

function useTodosPageState(
  categoryId: ID,
  todoEditFormState: TodoEditFormState
) {
  const { data, loading, refetch } = useTodosPageQuery({
    variables: { categoryId, categoryUUID: categoryId },
    fetchPolicy: 'cache-and-network',
  });
  const { data: pageData } = usePageIsSyncingQuery();

  const [now, setNow] = React.useState(() => Date.now());

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  const count = todoEditFormState.selectedTodoIds.length;

  return {
    categories: data?.categories ?? [],
    categoryName: data?.category?.name ?? null,
    categoryTags: data?.tags ?? [],
    checkpoints: data?.checkpoints ?? [],
    isLoading: !data && loading,
    isSyncing: pageData?.page?.isSyncing ?? false,
    now,
    todos: data?.todos ?? [],
    userId: data?.me?.id ?? null,
    selectMode:
      count === 0
        ? SelectMode.NONE
        : count === 1
        ? SelectMode.SINGLE
        : SelectMode.MULTI,
  };
}

type Props = {
  categoryId: ID;
};

export const TodosPage: React.FunctionComponent<Props> = ({ categoryId }) => {
  const client = useApolloClient();
  const dispatch = useDispatch();
  const todoEditFormState = useTypedSelector((state) => state.todoEditForm);
  const [todoUsecase] = React.useState(() => new TodoUsecase(client, dispatch));

  const {
    categories,
    categoryName,
    categoryTags,
    checkpoints,
    isLoading,
    isSyncing,
    now,
    selectMode,
    todos,
    userId,
  } = useTodosPageState(categoryId, todoEditFormState);

  const handleSelectOneTodo = React.useCallback(
    (todo: RootTodoFragment) => {
      dispatch(todoEditFormSelectOne(todo));
    },
    [dispatch]
  );

  const handleSelectManyTodo = React.useCallback(
    (todo: RootTodoFragment) => {
      dispatch(todoEditFormSelectMany(todo));
    },
    [dispatch]
  );

  const handleDeselectTodo = React.useCallback(() => {
    dispatch(todoEditFormReset());
  }, [dispatch]);

  const handleCreateOneTodo = React.useCallback(() => {
    if (!userId) return;
    todoUsecase.createOneTodo(userId, categoryId, todoEditFormState);
  }, [categoryId, todoEditFormState, todoUsecase, userId]);

  const handleDeleteTodosById = React.useCallback(() => {
    todoUsecase.deleteTodosById(categoryId, todoEditFormState.selectedTodoIds);
  }, [categoryId, todoEditFormState.selectedTodoIds, todoUsecase]);

  const handleUpdateTodosById = React.useCallback(() => {
    todoUsecase.updateTodosById(todoEditFormState);
  }, [todoEditFormState, todoUsecase]);

  const handleToggleStatus = React.useCallback(
    (todo: RootTodoFragment) => {
      todoUsecase.toggleStatus(todo);
    },
    [todoUsecase]
  );

  const handleArchiveTodosById = React.useCallback(() => {
    todoUsecase.archiveTodosById(categoryId, todoEditFormState.selectedTodoIds);
  }, [categoryId, todoEditFormState.selectedTodoIds, todoUsecase]);

  const handleToggleTag = React.useCallback(
    (tag: TodoTagFragment) => {
      dispatch(todoEditFormToggleTag(tag));
    },
    [dispatch]
  );

  const handleChangeText = React.useCallback(
    (text: string) => {
      dispatch(todoEditFormSet({ text }));
    },
    [dispatch]
  );

  const handleSelectStatus = React.useCallback(
    (status: TodoStatus) => {
      dispatch(todoEditFormSet({ status }));
    },
    [dispatch]
  );

  const handleSelectCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoEditFormSet({ checkpoint }));
    },
    [dispatch]
  );

  const checkpointsWithDummy = React.useMemo(
    () => [DUMMY_CHECKPOINT, ...checkpoints],
    [checkpoints]
  );

  React.useEffect(
    () => {
      dispatch(todoEditFormReset());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
        isSyncing={isSyncing}
      />
      <TodoList
        now={now}
        selectedTodoIds={todoEditFormState.selectedTodoIds}
        todos={todos}
        onClick={handleSelectOneTodo}
        onClickStatus={handleToggleStatus}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categoryTags={categoryTags}
        checkpoint={todoEditFormState.checkpoint}
        checkpoints={checkpointsWithDummy}
        selectMode={selectMode}
        status={todoEditFormState.status}
        tags={todoEditFormState.tags}
        text={todoEditFormState.text}
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
