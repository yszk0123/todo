import { useRouter } from 'next/router';
import React from 'react';

import { EMPTY } from '../../shared/constants/EMPTY';
import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { TodoStatus } from '../../shared/graphql/__generated__/baseTypes';
import { usePageIsSyncingQuery } from '../../shared/graphql/__generated__/Page.graphql';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { ID } from '../../view_models/ID';
import { SelectMode } from '../../view_models/SelectMode';
import { getArchiveStatus } from '../../view_models/Todo';
import { getSelectedTodoIds } from '../../view_models/TodoSelection';
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
import { getTodoWhereInput } from '../view_models/TodoWhereInput';

function getQueryVariables(
  query: TodoSearchQuery | null
): TodosPageQueryVariables {
  return {
    todoInput: getTodoWhereInput(query),
    tagInput: getTagWhereInput(query),
  };
}

export function useTodosPageState() {
  const router = useRouter();
  const todoSearchQuery = React.useMemo(
    () => parseTodoSearchRawQuery(router.query),
    [router.query]
  );
  const todoSearchFormState = useTypedSelector((state) => state.todoSearchForm);
  const variables = React.useMemo(() => getQueryVariables(todoSearchQuery), [
    todoSearchQuery,
  ]);
  const { data, loading, refetch } = useTodosPageQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const { data: pageData } = usePageIsSyncingQuery();
  const todoEditFormState = useTypedSelector((state) => state.todoEditForm);

  const [now, setNow] = React.useState(() => Date.now());

  const category = React.useMemo(() => {
    const categoryId = todoSearchQuery.categoryId;
    return (
      data?.categories?.find((category) => category.id === categoryId) ?? null
    );
  }, [todoSearchQuery.categoryId, data?.categories]);

  const archiveStatus = React.useMemo(
    () => getArchiveStatus(data?.todos ?? EMPTY),
    [data?.todos]
  );

  const selectedTodoIds = getSelectedTodoIds(todoEditFormState.selection);

  const status = React.useMemo(
    () => getStatus(data?.todos ?? EMPTY, selectedTodoIds),
    [data?.todos, selectedTodoIds]
  );

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  const count = selectedTodoIds.length;

  return {
    categories: data?.categories ?? EMPTY,
    category,
    categoryTags: data?.tags ?? EMPTY,
    checkpoints: data?.checkpoints ?? EMPTY,
    isCategoryNameShown: todoSearchQuery.categoryId == null,
    isLoading: !data && loading,
    isSyncing: loading || (pageData?.page?.isSyncing ?? false),
    archiveStatus,
    now,
    status,
    todoEditFormState,
    todos: data?.todos ?? EMPTY,
    userId: data?.me?.id ?? null,
    todoSearchFormState,
    todoSearchQuery,
    selectMode:
      count === 0
        ? SelectMode.NONE
        : count === 1
        ? SelectMode.SINGLE
        : SelectMode.MULTI,
  };
}

function getStatus(
  todos: RootTodoFragment[],
  selectedTodoIds: ID[]
): TodoStatus | null {
  const selectedTodos = todos.filter((todo) =>
    selectedTodoIds.includes(todo.id)
  );
  if (selectedTodos.length === 0) return null;

  const status = selectedTodos[0].status;
  return selectedTodos.every((todo) => todo.status === status) ? status : null;
}
