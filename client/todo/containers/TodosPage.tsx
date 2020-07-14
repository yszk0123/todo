import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { useGlobalEscapeKey } from '../../shared/hooks/useGlobalEscapeKey';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { DateTime } from '../../view_models/DateTime';
import { EmptyProps } from '../../view_models/EmptyProps';
import { TodoEditForm } from '../components/TodoEditForm';
import { TodoGroupedList } from '../components/TodoGroupedList';
import { TodoSearchForm } from '../components/TodoSearchForm';
import { TodoStatusBar } from '../components/TodoStatusBar';
import {
  todoEditFormReset,
  todoEditFormSelectMany,
  todoEditFormSet,
  todoEditFormToggleTag,
} from '../ducks/TodoEditFormDucks';
import {
  todoSearchFormReset,
  todoSearchFormSet,
  todoSearchFormToggleTag,
} from '../ducks/TodoSearchFormDucks';
import {
  RootTodoFragment,
  TodoCategoryFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';
import { useTodosPageState } from '../hooks/useTodosPageState';
import { useTodoUsecase } from '../hooks/useTodoUsecase';

export const TodosPage: React.FunctionComponent<EmptyProps> = () => {
  const dispatch = useDispatch();
  const todoUsecase = useTodoUsecase();
  const {
    archiveStatus,
    categories,
    category,
    categoryTags,
    checkpoints,
    isCategoryNameShown,
    isLoading,
    isSyncing,
    now,
    selectMode,
    todoEditFormState,
    todoSearchFormDraft,
    todoSearchQuery,
    todos,
    userId,
  } = useTodosPageState();
  const { modalType, onCloseModal, onOpenEdit, onOpenSearch } = useModalType();

  const handleSelectManyTodo = React.useCallback(
    (todo: RootTodoFragment) => {
      dispatch(todoEditFormSelectMany(todo));
    },
    [dispatch]
  );

  const handleSelectByTag = React.useCallback(
    (tag: TodoTagFragment) => {
      todoUsecase.search({ tags: [tag] });
    },
    [todoUsecase]
  );

  const handleSelectByCategory = React.useCallback(
    (category: TodoCategoryFragment) => {
      todoUsecase.search({ category });
    },
    [todoUsecase]
  );

  const handleDeselectTodo = React.useCallback(() => {
    dispatch(todoEditFormReset());
  }, [dispatch]);

  const handleCreateOneTodo = React.useCallback(() => {
    if (!userId) return;
    todoUsecase.createOneTodo(userId, todoEditFormState, todoSearchQuery);
  }, [todoEditFormState, todoSearchQuery, todoUsecase, userId]);

  const handleDeleteTodosById = React.useCallback(() => {
    todoUsecase.deleteTodosById(
      todoEditFormState.selectedTodoIds,
      todoSearchQuery
    );
  }, [todoEditFormState.selectedTodoIds, todoSearchQuery, todoUsecase]);

  const handleUpdateTodosById = React.useCallback(() => {
    todoUsecase.updateTodosById(todoEditFormState, todoSearchQuery);
    onCloseModal();
  }, [onCloseModal, todoEditFormState, todoSearchQuery, todoUsecase]);

  const handleToggleStatus = React.useCallback(
    (todo: RootTodoFragment) => {
      todoUsecase.toggleStatus(todo);
    },
    [todoUsecase]
  );

  const handleArchiveTodosById = React.useCallback(() => {
    todoUsecase.archiveTodosById(
      todoEditFormState.selectedTodoIds,
      todoSearchQuery
    );
  }, [todoEditFormState.selectedTodoIds, todoSearchQuery, todoUsecase]);

  const handleUnarchiveTodosById = React.useCallback(() => {
    todoUsecase.unarchiveTodosById(
      todoEditFormState.selectedTodoIds,
      todoSearchQuery
    );
  }, [todoEditFormState.selectedTodoIds, todoSearchQuery, todoUsecase]);

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

  const handleChangeArchivedAt = React.useCallback(
    (archivedAt: DateTime | null) => {
      dispatch(todoSearchFormSet({ archivedAt }));
    },
    [dispatch]
  );

  const handleSearchCommit = React.useCallback(() => {
    todoUsecase.search(todoSearchFormDraft);
    onCloseModal();
  }, [onCloseModal, todoSearchFormDraft, todoUsecase]);

  const handleSelectStatus = React.useCallback(
    (status: TodoStatus | null) => {
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
    (status: TodoStatus | null) => {
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

  const handleSearchByCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      todoUsecase.search({ category });
    },
    [todoUsecase]
  );

  const handleSearchByCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      todoUsecase.search({ checkpoint });
    },
    [todoUsecase]
  );

  const checkpointsWithDummy = React.useMemo(
    () => [DUMMY_CHECKPOINT, ...checkpoints],
    [checkpoints]
  );

  const handleEscape =
    modalType === ModalType.NONE ? handleDeselectTodo : onCloseModal;
  useGlobalEscapeKey(handleEscape);

  React.useEffect(
    () => {
      dispatch(todoEditFormReset());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [todoSearchQuery]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent onClick={handleDeselectTodo}>
      {category !== null && (
        <Head>
          <title>{category.name}</title>
        </Head>
      )}
      <TodoStatusBar
        archiveStatus={archiveStatus}
        categories={categories}
        category={category}
        count={todos.length}
        isSyncing={isSyncing}
        selectMode={selectMode}
        onClickArchive={handleArchiveTodosById}
        onClickCategory={handleSearchByCategory}
        onClickEdit={onOpenEdit}
        onClickSearch={onOpenSearch}
        onClickUnarchive={handleUnarchiveTodosById}
      />
      <TodoGroupedList
        isCategoryNameShown={isCategoryNameShown}
        now={now}
        selectedTodoIds={todoEditFormState.selectedTodoIds}
        todos={todos}
        onClick={handleSelectManyTodo}
        onClickCategory={handleSelectByCategory}
        onClickCheckpoint={handleSearchByCheckpoint}
        onClickStatus={handleToggleStatus}
        onClickTag={handleSelectByTag}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categories={categories}
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        todoEditFormState={todoEditFormState}
        onArchiveTodo={handleArchiveTodosById}
        onChangeText={handleChangeText}
        onCloseModal={onCloseModal}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectCategory={handleSelectCategory}
        onSelectCheckpoint={handleSelectCheckpoint}
        onSelectStatus={handleSelectStatus}
        onToggleTag={handleToggleTag}
        onUpdateOneTodo={handleUpdateTodosById}
      />
      <TodoSearchForm
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.SEARCH}
        todoSearchFormValue={todoSearchFormDraft}
        onChangeArchivedAt={handleChangeArchivedAt}
        onChangeText={handleChangeSearchText}
        onCloseModal={onCloseModal}
        onCommit={handleSearchCommit}
        onReset={handleSearchReset}
        onSelectCheckpoint={handleSelectSearchCheckpoint}
        onSelectStatus={handleSelectSearchStatus}
        onToggleTag={handleToggleSearchTag}
      />
    </PageContent>
  );
};

enum ModalType {
  NONE,
  SEARCH,
  EDIT,
}

function useModalType() {
  const [modalType, setModalType] = React.useState(ModalType.NONE);

  const onCloseModal = React.useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  const onOpenSearch = React.useCallback(() => {
    setModalType(ModalType.SEARCH);
  }, []);

  const onOpenEdit = React.useCallback(() => {
    setModalType(ModalType.EDIT);
  }, []);

  return { onCloseModal, onOpenSearch, onOpenEdit, modalType };
}
