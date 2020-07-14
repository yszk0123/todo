import { useRouter } from 'next/router';
import React from 'react';

import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { usePageIsSyncingQuery } from '../../shared/graphql/__generated__/Page.graphql';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { SelectMode } from '../../view_models/SelectMode';
import { getArchiveStatus } from '../../view_models/Todo';
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

const DEFAULT_PREV = '__DEFAULT_PREV__' as const;

export function useTodosPageState() {
  const router = useRouter();
  const query = React.useMemo(() => parseTodoSearchRawQuery(router.query), [
    router.query,
  ]);
  const todoSearchFormState = useTypedSelector((state) => state.todoSearchForm);
  const current = todoSearchFormState.current;
  const variables = React.useMemo(() => getQueryVariables(query), [query]);
  const { data, loading, refetch } = useTodosPageQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const { data: pageData } = usePageIsSyncingQuery();
  const todoEditFormState = useTypedSelector((state) => state.todoEditForm);
  const prev = React.useRef<TodoSearchQuery | typeof DEFAULT_PREV | null>(
    DEFAULT_PREV
  );

  React.useEffect(() => {
    if (prev.current !== DEFAULT_PREV && prev.current === current) {
      return;
    }
    prev.current = current;

    router.push({
      pathname: router.pathname,
      query: current, // FIXME: Convert TodoSearchQuery into ParsedQuery
    });
  }, [current, router, prev]);

  const [now, setNow] = React.useState(() => Date.now());

  const category = React.useMemo(() => {
    const categoryId = current?.categoryId;
    return (
      data?.categories?.find((category) => category.id === categoryId) ?? null
    );
  }, [current?.categoryId, data?.categories]);

  const archiveStatus = React.useMemo(
    () => getArchiveStatus(data?.todos ?? []),
    [data?.todos]
  );

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
      setNow(Date.now());
    }
  }, UPDATE_INTERVAL);

  const count = todoEditFormState.selectedTodoIds.length;

  return {
    categories: data?.categories ?? [],
    category,
    categoryTags: data?.tags ?? [],
    checkpoints: data?.checkpoints ?? [],
    isCategoryNameShown: current?.categoryId == null,
    isLoading: !data && loading,
    isSyncing: loading || (pageData?.page?.isSyncing ?? false),
    archiveStatus,
    now,
    todoEditFormState,
    todos: data?.todos ?? [],
    userId: data?.me?.id ?? null,
    todoSearchFormCurrent: todoSearchFormState.current,
    todoSearchFormDraft: todoSearchFormState.draft,
    selectMode:
      count === 0
        ? SelectMode.NONE
        : count === 1
        ? SelectMode.SINGLE
        : SelectMode.MULTI,
  };
}
