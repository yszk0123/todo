import React from 'react';

import { UPDATE_INTERVAL } from '../../shared/constants/UPDATE_INTERVAL';
import { usePageIsSyncingQuery } from '../../shared/graphql/__generated__/Page.graphql';
import { useInterval } from '../../shared/hooks/useInterval';
import { useTypedSelector } from '../../shared/hooks/useTypedSelector';
import { isDocumentVisible } from '../../shared/view_helpers/isDocumentVisible';
import { ID } from '../../viewModels/ID';
import { SelectMode } from '../../viewModels/SelectMode';
import { useTodosPageQuery } from '../graphql/__generated__/TodosPage.graphql';

export function useTodosPageState(categoryId: ID) {
  const { data, loading, refetch } = useTodosPageQuery({
    variables: { categoryId, categoryUUID: categoryId },
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
    categoryName: data?.category?.name ?? null,
    categoryTags: data?.tags ?? [],
    checkpoints: data?.checkpoints ?? [],
    isLoading: !data && loading,
    isSyncing: pageData?.page?.isSyncing ?? false,
    now,
    todoEditFormState,
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
