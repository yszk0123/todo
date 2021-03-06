import { useRouter } from 'next/router';
import React from 'react';

import { EMPTY } from '../../shared/constants/EMPTY';
import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { usePageIsSyncingQuery } from '../../shared/graphql/__generated__/Page.graphql';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { getSelectedIds, Selection } from '../../view_models/Selection';
import { getSelectModeFromSelection } from '../../view_models/SelectMode';
import { getArchiveStatus, sortTodoTags } from '../../view_models/Todo';
import { RootTodoFragment } from '../graphql/__generated__/Todo.graphql';
import {
  TodosPageQueryVariables,
  useTodosPageQuery,
} from '../graphql/__generated__/TodosPage.graphql';
import { getTagWhereInput } from '../view_models/TagWhereInput';
import {
  parseTodoSearchRawQuery,
  TodoSearchQuery,
} from '../view_models/TodoSearchQuery';
import {
  getTodoWhereInput,
  getTodoWhereUniqueInput,
} from '../view_models/TodoWhereInput';

function getQueryVariables(
  query: TodoSearchQuery | null
): TodosPageQueryVariables {
  return {
    tagsInput: getTagWhereInput(query),
    todoInput: getTodoWhereUniqueInput(query),
    todosInput: getTodoWhereInput(query),
  };
}

export function useTodosPageState() {
  const router = useRouter();
  const todoSearchQuery = React.useMemo(
    () => parseTodoSearchRawQuery(router.query),
    [router.query]
  );
  const todoSearchFormValues = useTypedSelector(
    (state) => state.todoSearchForm
  );
  const variables = React.useMemo(() => getQueryVariables(todoSearchQuery), [
    todoSearchQuery,
  ]);
  const { data, loading, refetch } = useTodosPageQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const { data: pageData } = usePageIsSyncingQuery();
  const todoEditFormValues = useTypedSelector(
    (state) => state.todoEditFormValues
  );
  const todoSelection = useTypedSelector((state) => state.todoSelection);

  const [now, setNow] = React.useState(() => Date.now());

  const mergedTodos = React.useMemo(
    () => (data?.todo ? [data.todo, ...data?.todos] : data?.todos) ?? EMPTY,
    [data?.todo, data?.todos]
  );

  const category = React.useMemo(() => {
    const categoryId = todoSearchQuery.categoryId;
    return (
      data?.categories?.find((category) => category.id === categoryId) ?? null
    );
  }, [todoSearchQuery.categoryId, data?.categories]);

  const archiveStatus = React.useMemo(() => getArchiveStatus(mergedTodos), [
    mergedTodos,
  ]);

  const status = React.useMemo(() => getStatus(mergedTodos, todoSelection), [
    mergedTodos,
    todoSelection,
  ]);

  const categoryTags = React.useMemo(() => sortTodoTags(data?.tags ?? EMPTY), [
    data?.tags,
  ]);

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  return {
    categories: data?.categories ?? EMPTY,
    category,
    categoryTags,
    checkpoints: data?.checkpoints ?? EMPTY,
    isCategoryNameShown: todoSearchQuery.categoryId == null,
    isLoading: !data && loading,
    isSyncing: loading || (pageData?.page?.isSyncing ?? false),
    archiveStatus,
    now,
    status,
    todoEditFormValues,
    todoSelection,
    todos: mergedTodos,
    userId: data?.me?.id ?? null,
    todoSearchFormValues,
    todoSearchQuery,
    selectMode: getSelectModeFromSelection(todoSelection),
  };
}

function getStatus(
  todos: RootTodoFragment[],
  selection: Selection
): TodoStatus | null {
  const selectedTodoIds = getSelectedIds(selection);
  const selectedTodos = todos.filter((todo) =>
    selectedTodoIds.includes(todo.id)
  );
  if (selectedTodos.length === 0) return null;

  const status = selectedTodos[0].status;
  return selectedTodos.every((todo) => todo.status === status) ? status : null;
}
