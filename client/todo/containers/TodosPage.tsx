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
import {
  getTextFromClipboard,
  setCSVToClipboard,
} from '../../shared/view_models/__experimental__/Clipboard';
import { DUMMY_CHECKPOINT } from '../../view_models/Checkpoint';
import { DateTime } from '../../view_models/DateTime';
import { EmptyProps } from '../../view_models/EmptyProps';
import {
  getSelected,
  getSelectedIds,
  Selection,
} from '../../view_models/Selection';
import { TodoEditForm } from '../components/TodoEditForm';
import { TodoGroupedList } from '../components/TodoGroupedList';
import { TodoSearchForm } from '../components/TodoSearchForm';
import { TodoStatusBar } from '../components/TodoStatusBar';
import { todoEditFormOpen, todoEditFormSet } from '../ducks/TodoEditFormDucks';
import {
  todoSearchFormReset,
  todoSearchFormSet,
} from '../ducks/TodoSearchFormDucks';
import {
  todoSelectionDeselect,
  todoSelectionExpandTodo,
  todoSelectionSelectAll,
  todoSelectionSelectMany,
} from '../ducks/TodoSelectionDucks';
import {
  RootTodoFragment,
  TodoCategoryFragment,
} from '../graphql/__generated__/Todo.graphql';
import { TodoTagFragment } from '../graphql/__generated__/Todo.graphql';
import { useTodosPageState } from '../hooks/useTodosPageState';
import { useTodoUsecase } from '../hooks/useTodoUsecase';
import {
  printTodosReportAsCSV,
  printTodosReportAsMarkdown,
} from '../view_models/TodosReport';

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
    todoSearchFormValues,
    todoSearchQuery,
    todoSelection,
    todos,
    userId,
  } = useTodosPageState();
  const {
    modalType,
    onCloseModal,
    onOpenEdit,
    onOpenEditWithText,
    onOpenSearch,
  } = useModalType(todos, todoSelection);
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

  const handleChangeTags = React.useCallback(
    (tags: TodoTagFragment[]) => {
      dispatch(todoEditFormSet({ tags }));
    },
    [dispatch]
  );

  const handleSetText = React.useCallback(
    (text: string) => {
      dispatch(todoEditFormSet({ text }));
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
      dispatch(todoEditFormSet({ status }));
    },
    [dispatch]
  );

  const handleSetCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      dispatch(todoEditFormSet({ checkpoint }));
    },
    [dispatch]
  );

  const handleSetCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      dispatch(todoEditFormSet({ category }));
    },
    [dispatch]
  );

  const handleToggleTagInSearch = React.useCallback(
    (tags: TodoTagFragment[]) => {
      dispatch(todoSearchFormSet({ tags }));
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

  const handleSelectAll = React.useCallback(() => {
    dispatch(todoSelectionSelectAll(todos));
  }, [dispatch, todos]);

  const handleSearch = React.useCallback(() => {
    todoUsecase.search(todoSearchFormValues);
    onCloseModal();
  }, [onCloseModal, todoSearchFormValues, todoUsecase]);

  const handleSearchByTodoTag = React.useCallback(
    (tag: TodoTagFragment) => {
      todoUsecase.searchToggleTag(tag, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByTodoTags = React.useCallback(
    (tags: TodoTagFragment[]) => {
      todoUsecase.search({ tags }, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByTodoCategory = React.useCallback(
    (category: TodoCategoryFragment) => {
      todoUsecase.search({ category }, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByRootCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      todoUsecase.search({ category }, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByRootCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      todoUsecase.search({ checkpoint }, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByStatusToggle = React.useCallback(
    (status: TodoStatus | null) => {
      todoUsecase.searchToggleStatus(status, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
  );

  const handleSearchByArchivedAt = React.useCallback(
    (archivedAt: DateTime | null) => {
      todoUsecase.search({ archivedAt }, todoSearchQuery);
    },
    [todoSearchQuery, todoUsecase]
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

  const handleEditTags = React.useCallback(
    (tags: TodoTagFragment[]) => {
      todoUsecase.updateTagToggle(selectedTodoIds, tags, todoSearchQuery);
    },
    [selectedTodoIds, todoSearchQuery, todoUsecase]
  );

  const handleEditByRootCategory = React.useCallback(
    (category: RootCategoryFragment | null) => {
      if (category !== null) {
        todoUsecase.updateCategory(selectedTodoIds, category, todoSearchQuery);
      }
    },
    [selectedTodoIds, todoSearchQuery, todoUsecase]
  );

  const handleEditByRootCheckpoint = React.useCallback(
    (checkpoint: RootCheckpointFragment | null) => {
      if (checkpoint !== null) {
        todoUsecase.updateCheckpoint(
          selectedTodoIds,
          checkpoint,
          todoSearchQuery
        );
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

  const handleDuplicateTodosById = React.useCallback(() => {
    todoUsecase.duplicateTodosById(selectedTodoIds, todoSearchQuery);
  }, [selectedTodoIds, todoSearchQuery, todoUsecase]);

  const checkpointsWithDummy = React.useMemo(
    () => [DUMMY_CHECKPOINT, ...checkpoints],
    [checkpoints]
  );

  const handleEscape =
    modalType === ModalType.NONE ? handleDeselectTodo : onCloseModal;
  useGlobalEscapeKey(handleEscape);

  const handleCopyTodosAsCSV = useCopyTodosAsCSV();
  const handleCopyTodosAsMarkdown = useCopyTodosAsMarkdown();
  const handlePasteTodo = usePasteTodo(onOpenEditWithText);

  useDrop(onOpenEditWithText, modalType === ModalType.NONE);

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
      case Command.SELECT_ALL: {
        handleSelectAll();
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
      case Command.COPY_TODOS_AS_CSV: {
        handleCopyTodosAsCSV(todos, todoSelection);
        break;
      }
      case Command.COPY_TODOS_AS_MARKDOWN: {
        handleCopyTodosAsMarkdown(todos, todoSelection);
        break;
      }
      case Command.PASTE_TODO: {
        handlePasteTodo();
        break;
      }
    }
  });

  React.useEffect(() => {
    dispatch(todoSelectionDeselect());
  }, [dispatch, todoSearchQuery]);

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
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        count={todos.length}
        isSyncing={isSyncing}
        selectMode={selectMode}
        status={status}
        todos={todos}
        todoSearchQuery={todoSearchQuery}
        todoSelection={todoSelection}
        onChangeStatus={handleUpdateStatus}
        onClickArchive={handleArchiveTodosById}
        onClickDuplicate={handleDuplicateTodosById}
        onClickEdit={onOpenEdit}
        onClickEditCheckpoint={handleEditByRootCheckpoint}
        onClickSearch={onOpenSearch}
        onClickSearchStatus={handleSearchByStatusToggle}
        onClickUnarchive={handleUnarchiveTodosById}
        onEditCategory={handleEditByRootCategory}
        onEditTags={handleEditTags}
        onSearchChangeArchivedAt={handleSearchByArchivedAt}
        onSearchChangeStatus={handleSearchByStatusToggle}
        onSearchChangeTags={handleSearchByTodoTags}
        onSearchSelectCategory={handleSearchByRootCategory}
        onSearchSelectCheckpoint={handleSearchByRootCheckpoint}
        onSearchToggleTag={handleSearchByTodoTag}
      />
      {isLoading ? (
        <LoadingIndicator />
      ) : (
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
      )}
      <TodoEditForm
        categories={categories}
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        todoEditFormValues={todoEditFormValues}
        onChangeTags={handleChangeTags}
        onChangeText={handleSetText}
        onCloseModal={onCloseModal}
        onCreateOneTodo={handleCreateOneTodo}
        onDeleteOneTodo={handleDeleteTodosById}
        onSelectCategory={handleSetCategory}
        onSelectCheckpoint={handleSetCheckpoint}
        onSelectStatus={handleSetStatus}
        onUpdateOneTodo={handleUpdateTodosById}
      />
      <TodoSearchForm
        categoryTags={categoryTags}
        checkpoints={checkpointsWithDummy}
        isOpen={modalType === ModalType.SEARCH}
        todoSearchFormValues={todoSearchFormValues}
        onChangeArchivedAt={handleSetArchivedAt}
        onChangeTags={handleToggleTagInSearch}
        onChangeText={handleSetTextInSearch}
        onCloseModal={onCloseModal}
        onCommit={handleSearch}
        onReset={handleResetSearch}
        onSelectCheckpoint={handleSetCheckpointInSearch}
        onSelectStatus={handleSetStatusInSearch}
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
    dispatch(todoEditFormOpen(todos, todoSelection));
    setModalType(ModalType.EDIT);
  }, [dispatch, todoSelection, todos]);

  const onOpenEditWithText = React.useCallback(
    (text: string) => {
      dispatch(todoEditFormOpen(todos, todoSelection, text));
      setModalType(ModalType.EDIT);
    },
    [dispatch, todoSelection, todos]
  );

  return {
    onCloseModal,
    onOpenSearch,
    onOpenEdit,
    onOpenEditWithText,
    modalType,
  };
}

enum Command {
  CHANGE_STATUS_TO_DONE,
  CHANGE_STATUS_TO_WAITING,
  CHANGE_STATUS_TO_IN_PROGRESS,
  CHANGE_STATUS_TO_TODO,
  COPY_TODOS_AS_CSV,
  COPY_TODOS_AS_MARKDOWN,
  OPEN_EDIT,
  OPEN_SEARCH,
  PASTE_TODO,
  SELECT_ALL,
  NONE,
}

function translateShortcut(shortcut: Shortcut): Command {
  switch (shortcut.code) {
    case KeyCode.A:
      return shortcut.cmd ? Command.SELECT_ALL : Command.NONE;
    case KeyCode.E:
      return Command.OPEN_EDIT;
    case KeyCode.S:
      return Command.OPEN_SEARCH;
    case KeyCode.X:
      return Command.CHANGE_STATUS_TO_DONE;
    case KeyCode.C:
      return shortcut.cmd && shortcut.alt
        ? Command.COPY_TODOS_AS_CSV
        : shortcut.cmd
        ? Command.COPY_TODOS_AS_MARKDOWN
        : Command.NONE;
    case KeyCode.V:
      return shortcut.cmd ? Command.PASTE_TODO : Command.NONE;
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

function useDrop(onDrop: (text: string) => void, isEnabled: boolean): void {
  React.useEffect(() => {
    if (!isEnabled) {
      return;
    }

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer?.types.includes('text/plain')) {
        const text = event.dataTransfer.getData('text/plain');
        onDrop(text);
      }
    };
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'copy';
      }
    };
    const element = document.body;
    element.addEventListener('drop', handleDrop);
    element.addEventListener('dragover', handleDragOver);

    return () => {
      element.removeEventListener('drop', handleDrop);
      element.removeEventListener('dragover', handleDragOver);
    };
  }, [isEnabled, onDrop]);
}

function useCopyTodosAsCSV() {
  return React.useCallback(
    (todos: RootTodoFragment[], todoSelection: Selection) => {
      const selectedTodos = getSelected(
        todos,
        todoSelection,
        (todo) => todo.id
      );
      const text = printTodosReportAsCSV(selectedTodos);
      setCSVToClipboard(text);
    },
    []
  );
}

function useCopyTodosAsMarkdown() {
  return React.useCallback(
    (todos: RootTodoFragment[], todoSelection: Selection) => {
      const selectedTodos = getSelected(
        todos,
        todoSelection,
        (todo) => todo.id
      );
      const text = printTodosReportAsMarkdown(selectedTodos);
      setCSVToClipboard(text);
    },
    []
  );
}

function usePasteTodo(onOpenEditWithText: (text: string) => void) {
  return React.useCallback(async () => {
    const text = await getTextFromClipboard();
    const convertedText = convertMarkdownToText(text);
    onOpenEditWithText(convertedText);
  }, [onOpenEditWithText]);
}

function convertMarkdownToText(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 $2').replace(/\\/g, '');
}
