import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { DUMMY_CHECKPOINT } from '../../viewModels/Checkpoint';
import { ID } from '../../viewModels/ID';
import { TodoEditForm } from '../components/TodoEditForm';
import { TodoList } from '../components/TodoList';
import { TodoSearchForm } from '../components/TodoSearchForm';
import { TodoStatusBar } from '../components/TodoStatusBar';
import {
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSelectOne,
  todoEditFormSet,
  todoEditFormToggleTag,
} from '../ducks/TodoEditFormDucks';
import {
  todoSearchFormCommit,
  todoSearchFormReset,
  todoSearchFormSet,
  todoSearchFormToggleTag,
} from '../ducks/TodoSearchFormDucks';
import { RootTodoFragment } from '../graphql/__generated__/Todo.graphql';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';
import { useTodosPageState } from '../hooks/useTodosPageState';
import { useTodoUsecase } from '../hooks/useTodoUsecase';

type Props = {
  categoryId: ID | null;
};

export const TodosPage: React.FunctionComponent<Props> = ({ categoryId }) => {
  const dispatch = useDispatch();
  const todoUsecase = useTodoUsecase();
  const {
    categories,
    categoryName,
    categoryTags,
    checkpoints,
    isCategoryNameShown,
    isLoading,
    isSyncing,
    now,
    selectMode,
    todoEditFormState,
    todoSearchFormCurrent,
    todoSearchFormDraft,
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
    todoUsecase.createOneTodo(
      userId,
      categoryId,
      todoEditFormState,
      todoSearchFormCurrent
    );
  }, [
    categoryId,
    todoEditFormState,
    todoSearchFormCurrent,
    todoUsecase,
    userId,
  ]);

  const handleDeleteTodosById = React.useCallback(() => {
    todoUsecase.deleteTodosById(
      categoryId,
      todoEditFormState.selectedTodoIds,
      todoSearchFormCurrent
    );
  }, [
    categoryId,
    todoEditFormState.selectedTodoIds,
    todoSearchFormCurrent,
    todoUsecase,
  ]);

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
    todoUsecase.archiveTodosById(
      categoryId,
      todoEditFormState.selectedTodoIds,
      todoSearchFormCurrent
    );
  }, [
    categoryId,
    todoEditFormState.selectedTodoIds,
    todoSearchFormCurrent,
    todoUsecase,
  ]);

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

  const handleSearchReset = React.useCallback(() => {
    dispatch(todoSearchFormReset());
  }, [dispatch]);

  const handleSearchCommit = React.useCallback(() => {
    dispatch(todoSearchFormCommit());
  }, [dispatch]);

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

  const handleSelectCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      dispatch(todoEditFormSet({ category }));
    },
    [dispatch]
  );

  const handleToggleSearchTag = React.useCallback(
    (tag: TodoTagFragment) => {
      dispatch(todoSearchFormToggleTag(tag));
    },
    [dispatch]
  );

  const handleChangeSearchText = React.useCallback(
    (text: string) => {
      dispatch(todoSearchFormSet({ text }));
    },
    [dispatch]
  );

  const handleSelectSearchStatus = React.useCallback(
    (status: TodoStatus) => {
      dispatch(todoSearchFormSet({ status }));
    },
    [dispatch]
  );

  const handleSelectSearchCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoSearchFormSet({ checkpoint }));
    },
    [dispatch]
  );

  const handleSelectSearchCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      dispatch(todoSearchFormSet({ category }));
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
        isCategoryNameShown={isCategoryNameShown}
        now={now}
        selectedTodoIds={todoEditFormState.selectedTodoIds}
        todos={todos}
        onClick={handleSelectOneTodo}
        onClickStatus={handleToggleStatus}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categories={categories}
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        selectMode={selectMode}
        todoEditFormState={todoEditFormState}
        onArchiveTodo={handleArchiveTodosById}
        onChangeText={handleChangeText}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectCategory={handleSelectCategory}
        onSelectCheckpoint={handleSelectCheckpoint}
        onSelectStatus={handleSelectStatus}
        onToggleTag={handleToggleTag}
        onUpdateOneTodo={handleUpdateTodosById}
      />
      <TodoSearchForm
        categories={categories}
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        todoSearchFormValue={todoSearchFormDraft}
        onChangeText={handleChangeSearchText}
        onCommit={handleSearchCommit}
        onReset={handleSearchReset}
        onSelectCategory={handleSelectSearchCategory}
        onSelectCheckpoint={handleSelectSearchCheckpoint}
        onSelectStatus={handleSelectSearchStatus}
        onToggleTag={handleToggleSearchTag}
      />
    </PageContent>
  );
};
