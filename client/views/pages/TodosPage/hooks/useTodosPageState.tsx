import React from 'react';

import { usePageIsSyncingQuery } from '../../../../graphql/__generated__/Page.graphql';
import { useTodosPageQuery } from '../../../../graphql/__generated__/TodosPage.graphql';
import { ID } from '../../../../viewModels/ID';
import { SelectMode } from '../../../../viewModels/SelectMode';
import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { isDocumentVisible } from '../../../helpers/isDocumentVisible';
import { useInterval } from '../../../hooks/useInterval';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

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
