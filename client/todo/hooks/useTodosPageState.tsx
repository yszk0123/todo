import React from 'react';

import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { usePageIsSyncingQuery } from '../../shared/graphql/__generated__/Page.graphql';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { SelectMode } from '../../viewModels/SelectMode';
import { TodoSearchFormValue } from '../ducks/TodoSearchFormDucks';
import {
  TodosPageQueryVariables,
  useTodosPageQuery,
} from '../graphql/__generated__/TodosPage.graphql';

function getQueryVariables(
  todoSearchFormValue: TodoSearchFormValue | null
): TodosPageQueryVariables {
  return {
    todoInput: {
      categoryId: todoSearchFormValue?.category?.id
        ? { equals: todoSearchFormValue?.category?.id }
        : undefined,
      archivedAt: todoSearchFormValue?.archivedAt
        ? { lte: todoSearchFormValue.archivedAt }
        : { equals: null },
      status: todoSearchFormValue?.status ?? undefined,
      tags: todoSearchFormValue?.tags?.length
        ? { some: { id: { in: todoSearchFormValue.tags.map((t) => t.id) } } }
        : undefined,
      text: todoSearchFormValue?.text
        ? {
            contains: todoSearchFormValue.text,
          }
        : undefined,
    },
    tagInput: {
      categories: todoSearchFormValue?.category?.id
        ? { some: { id: { equals: todoSearchFormValue?.category?.id } } }
        : undefined,
      archivedAt: { equals: null },
    },
  };
}

export function useTodosPageState() {
  const todoSearchFormState = useTypedSelector((state) => state.todoSearchForm);
  const current = todoSearchFormState.current;
  const variables = React.useMemo(() => getQueryVariables(current), [current]);
  const { data, loading, refetch } = useTodosPageQuery({
    variables,
    fetchPolicy: 'cache-and-network',
  });
  const { data: pageData } = usePageIsSyncingQuery();
  const todoEditFormState = useTypedSelector((state) => state.todoEditForm);

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
    category: current?.category ?? null,
    categoryTags: data?.tags ?? [],
    checkpoints: data?.checkpoints ?? [],
    isCategoryNameShown: current?.category?.id == null,
    isLoading: !data && loading,
    isSyncing: loading || (pageData?.page?.isSyncing ?? false),
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
