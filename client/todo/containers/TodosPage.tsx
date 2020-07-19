import Head from 'next/head';
import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { RootCheckpointFragment } from '../../checkpoint/graphql/__generated__/Checkpoint.graphql';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { KeyCode } from '../../shared/constants/KeyCode';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { useGlobalEscapeKey } from '../../shared/hooks/useGlobalEscapeKey';
import {
  Shortcut,
  useGlobalShortcut,
} from '../../shared/hooks/useGlobalShortcut';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { DateTime } from '../../view_models/DateTime';
import { EmptyProps } from '../../view_models/EmptyProps';
import { getSelectedIds, Selection } from '../../view_models/TodoSelection';
import { TodoEditForm } from '../components/TodoEditForm';
import { TodoGroupedList } from '../components/TodoGroupedList';
import { TodoSearchForm } from '../components/TodoSearchForm';
import { TodoStatusBar } from '../components/TodoStatusBar';
import {
  todoEditFormValuesOpen,
  todoEditFormValuesSet,
  todoEditFormValuesToggleTag,
} from '../ducks/TodoEditFormValuesDucks';
import {
  todoSearchFormReset,
  todoSearchFormSet,
  todoSearchFormToggleTag,
} from '../ducks/TodoSearchFormDucks';
import {
  todoSelectionDeselect,
  todoSelectionExpandTodo,
  todoSelectionSelectMany,
} from '../ducks/TodoSelectionDucks';
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
    status,
    todoEditFormValues,
    todoSearchFormState,
    todoSearchQuery,
    todoSelection,
    todos,
    userId,
  } = useTodosPageState();
  const { modalType, onCloseModal, onOpenEdit, onOpenSearch } = useModalType(
    todos,
    todoSelection
  );
  const selectedTodoIds = getSelectedIds(todoSelection);

  const handleSelectManyTodo = React.useCallback(
    (todo: RootTodoFragment) => {
      dispatch(todoSelectionSelectMany(todo));
    },
    [dispatch]
  );

  const handleDeselectTodo = React.useCallback(() => {
    dispatch(todoSelectionDeselect());
  }, [dispatch]);

  const handleToggleTag = React.useCallback(
    (tag: TodoTagFragment) => {
      dispatch(todoEditFormValuesToggleTag(tag));
    },
    [dispatch]
  );

  const handleSetText = React.useCallback(
    (text: string) => {
      dispatch(todoEditFormValuesSet({ text }));
    },
    [dispatch]
  );

  const handleResetSearch = React.useCallback(() => {
    dispatch(todoSearchFormReset());
  }, [dispatch]);

  const handleSetArchivedAt = React.useCallback(
    (archivedAt: DateTime | null) => {
      dispatch(todoSearchFormSet({ archivedAt }));
    },
    [dispatch]
  );

  const handleSetStatus = React.useCallback(
    (status: TodoStatus | null) => {
      dispatch(todoEditFormValuesSet({ status }));
    },
    [dispatch]
  );

  const handleSetCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoEditFormValuesSet({ checkpoint }));
    },
    [dispatch]
  );

  const handleSetCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      dispatch(todoEditFormValuesSet({ category }));
    },
    [dispatch]
  );

  const handleToggleTagInSearch = React.useCallback(
    (tag: TodoTagFragment) => {
      dispatch(todoSearchFormToggleTag(tag));
    },
    [dispatch]
  );

  const handleSetTextInSearch = React.useCallback(
    (text: string) => {
      dispatch(todoSearchFormSet({ text }));
    },
    [dispatch]
  );

  const handleSetStatusInSearch = React.useCallback(
    (status: TodoStatus | null) => {
      dispatch(todoSearchFormSet({ status }));
    },
    [dispatch]
  );

  const handleSetCheckpointInSearch = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoSearchFormSet({ checkpoint }));
    },
    [dispatch]
  );

  const handleExpandTodo = React.useCallback(
    (todo: RootTodoFragment) => {
      dispatch(todoSelectionExpandTodo(todo));
    },
    [dispatch]
  );

  const handleSearch = React.useCallback(() => {
    todoUsecase.search(todoSearchFormState);
    onCloseModal();
  }, [onCloseModal, todoSearchFormState, todoUsecase]);

  const handleSearchByTodoTag = React.useCallback(
    (tag: TodoTagFragment) => {
      todoUsecase.search({ tags: [tag] });
    },
    [todoUsecase]
  );

  const handleSearchByTodoCategory = React.useCallback(
    (category: TodoCategoryFragment) => {
      todoUsecase.search({ category });
    },
    [todoUsecase]
  );

  const handleSearchByRootCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      todoUsecase.search({ category });
    },
    [todoUsecase]
  );

  const handleSearchByRootCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      todoUsecase.search({ checkpoint });
    },
    [todoUsecase]
  );

  const handleSearchByStatus = React.useCallback(
    (status: TodoStatus | null) => {
      todoUsecase.search({ status });
    },
    [todoUsecase]
  );

  const handleCreateOneTodo = React.useCallback(() => {
    if (!userId) return;
    todoUsecase.createOneTodo(userId, todoEditFormValues, todoSearchQuery);
  }, [todoEditFormValues, todoSearchQuery, todoUsecase, userId]);

  const handleDeleteTodosById = React.useCallback(() => {
    todoUsecase.deleteTodosById(selectedTodoIds, todoSearchQuery);
  }, [selectedTodoIds, todoSearchQuery, todoUsecase]);

  const handleUpdateTodosById = React.useCallback(() => {
    todoUsecase.updateTodosById(
      todoEditFormValues,
      todoSelection,
      todoSearchQuery
    );
    onCloseModal();
  }, [
    onCloseModal,
    todoEditFormValues,
    todoSearchQuery,
    todoSelection,
    todoUsecase,
  ]);

  const handleToggleStatus = React.useCallback(
    (todo: RootTodoFragment, status: TodoStatus) => {
      todoUsecase.updateStatus([todo.id], status);
    },
    [todoUsecase]
  );

  const handleUpdateStatus = React.useCallback(
    (status: TodoStatus | null) => {
      if (status !== null) {
        todoUsecase.updateStatus(selectedTodoIds, status);
      }
    },
    [selectedTodoIds, todoUsecase]
  );

  const handleUpdateCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      if (category !== null) {
        todoUsecase.updateCategory(selectedTodoIds, category, todoSearchQuery);
      }
    },
    [selectedTodoIds, todoSearchQuery, todoUsecase]
  );

  const handleArchiveTodosById = React.useCallback(() => {
    todoUsecase.archiveTodosById(selectedTodoIds, todoSearchQuery);
  }, [selectedTodoIds, todoSearchQuery, todoUsecase]);

  const handleUnarchiveTodosById = React.useCallback(() => {
    todoUsecase.unarchiveTodosById(selectedTodoIds, todoSearchQuery);
  }, [selectedTodoIds, todoSearchQuery, todoUsecase]);

  const checkpointsWithDummy = React.useMemo(
    () => [DUMMY_CHECKPOINT, ...checkpoints],
    [checkpoints]
  );

  const handleEscape =
    modalType === ModalType.NONE ? handleDeselectTodo : onCloseModal;
  useGlobalEscapeKey(handleEscape);

  useGlobalShortcut((shortcut) => {
    const command = translateShortcut(shortcut);
    switch (command) {
      case Command.OPEN_EDIT: {
        onOpenEdit();
        break;
      }
      case Command.OPEN_SEARCH: {
        onOpenSearch();
        break;
      }
      case Command.CHANGE_STATUS_TO_DONE: {
        handleUpdateStatus(TodoStatus.Done);
        break;
      }
      case Command.CHANGE_STATUS_TO_WAITING: {
        handleUpdateStatus(TodoStatus.Waiting);
        break;
      }
      case Command.CHANGE_STATUS_TO_IN_PROGRESS: {
        handleUpdateStatus(TodoStatus.InProgress);
        break;
      }
      case Command.CHANGE_STATUS_TO_TODO: {
        handleUpdateStatus(TodoStatus.Todo);
        break;
      }
    }
  });

  React.useEffect(() => {
    dispatch(todoSelectionDeselect());
  }, [dispatch, todoSearchQuery]);

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
        status={status}
        todoSearchQuery={todoSearchQuery}
        onChangeStatus={handleUpdateStatus}
        onClickArchive={handleArchiveTodosById}
        onClickEdit={onOpenEdit}
        onClickEditCategory={handleUpdateCategory}
        onClickSearch={onOpenSearch}
        onClickSearchCategory={handleSearchByRootCategory}
        onClickSearchStatus={handleSearchByStatus}
        onClickUnarchive={handleUnarchiveTodosById}
      />
      <TodoGroupedList
        isCategoryNameShown={isCategoryNameShown}
        now={now}
        todos={todos}
        todoSelection={todoSelection}
        onClick={handleSelectManyTodo}
        onClickCategory={handleSearchByTodoCategory}
        onClickCheckpoint={handleSearchByRootCheckpoint}
        onClickExpand={handleExpandTodo}
        onClickStatus={handleToggleStatus}
        onClickTag={handleSearchByTodoTag}
        onClickToggle={handleSelectManyTodo}
      />
      <TodoEditForm
        categories={categories}
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        todoEditFormValues={todoEditFormValues}
        onChangeText={handleSetText}
        onCloseModal={onCloseModal}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectCategory={handleSetCategory}
        onSelectCheckpoint={handleSetCheckpoint}
        onSelectStatus={handleSetStatus}
        onToggleTag={handleToggleTag}
        onUpdateOneTodo={handleUpdateTodosById}
      />
      <TodoSearchForm
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.SEARCH}
        todoSearchFormState={todoSearchFormState}
        onChangeArchivedAt={handleSetArchivedAt}
        onChangeText={handleSetTextInSearch}
        onCloseModal={onCloseModal}
        onCommit={handleSearch}
        onReset={handleResetSearch}
        onSelectCheckpoint={handleSetCheckpointInSearch}
        onSelectStatus={handleSetStatusInSearch}
        onToggleTag={handleToggleTagInSearch}
      />
    </PageContent>
  );
};

enum ModalType {
  NONE,
  SEARCH,
  EDIT,
}

function useModalType(todos: RootTodoFragment[], todoSelection: Selection) {
  const [modalType, setModalType] = React.useState(ModalType.NONE);
  const dispatch = useDispatch();

  const onCloseModal = React.useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  const onOpenSearch = React.useCallback(() => {
    setModalType(ModalType.SEARCH);
  }, []);

  const onOpenEdit = React.useCallback(() => {
    dispatch(todoEditFormValuesOpen(todos, todoSelection));
    setModalType(ModalType.EDIT);
  }, [dispatch, todoSelection, todos]);

  return { onCloseModal, onOpenSearch, onOpenEdit, modalType };
}

enum Command {
  CHANGE_STATUS_TO_DONE,
  CHANGE_STATUS_TO_WAITING,
  CHANGE_STATUS_TO_IN_PROGRESS,
  CHANGE_STATUS_TO_TODO,
  OPEN_EDIT,
  OPEN_SEARCH,
  NONE,
}

function translateShortcut(shortcut: Shortcut): Command {
  switch (shortcut.code) {
    case KeyCode.E:
      return Command.OPEN_EDIT;
    case KeyCode.S:
      return Command.OPEN_SEARCH;
    case KeyCode.X:
      return Command.CHANGE_STATUS_TO_WAITING;
    case KeyCode.Minus:
      return Command.CHANGE_STATUS_TO_WAITING;
    case KeyCode.Period:
      return shortcut.shift
        ? Command.CHANGE_STATUS_TO_IN_PROGRESS
        : Command.NONE;
    case KeyCode.O:
      return Command.CHANGE_STATUS_TO_TODO;
    default:
      return Command.NONE;
  }
}
