import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import { TodoStatus } from '../../../../graphql/__generated__/baseTypes';
import { RootCheckpointFragment } from '../../../../graphql/__generated__/Checkpoint.graphql';
import { RootTodoFragment } from '../../../../graphql/__generated__/Todo.graphql';
import { TodoTagFragment } from '../../../../graphql/__generated__/Todo.graphql';
import {
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSelectOne,
  todoEditFormSet,
  todoEditFormToggleTag,
} from '../../../../models/TodoEditFormDucks';
import { useTodoUsecase } from '../../../../usecases/useTodoUsecase';
import { DUMMY_CHECKPOINT } from '../../../../viewModels/Checkpoint';
import { ID } from '../../../../viewModels/ID';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { PageContent } from '../../../components/PageContent';
import { TodoEditForm } from '../components/TodoEditForm';
import { TodoList } from '../components/TodoList';
import { TodoStatusBar } from '../components/TodoStatusBar';
import { useTodosPageState } from '../hooks/useTodosPageState';

type Props = {
  categoryId: ID;
};

export const TodosPage: React.FunctionComponent<Props> = ({ categoryId }) => {
  const dispatch = useDispatch();
  const todoUsecase = useTodoUsecase();
  const {
    categories,
    categoryName,
    categoryTags,
    checkpoints,
    isLoading,
    isSyncing,
    now,
    selectMode,
    todoEditFormState,
    todos,
    userId,
  } = useTodosPageState(categoryId);

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
