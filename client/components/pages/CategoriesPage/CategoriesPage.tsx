import { useApolloClient } from '@apollo/client';
import React from 'react';

import { UPDATE_INTERVAL } from '../../../constants/UPDATE_INTERVAL';
import { useCategoriesPageQuery } from '../../../graphql/__generated__/CategoriesPage.graphql';
import { RootCategoryFragment } from '../../../graphql/__generated__/Category.graphql';
import {
  categoryEditFormInitialState,
  categoryEditFormReducer,
  categoryEditFormReset,
  categoryEditFormSelectOne,
  categoryEditFormSet,
} from '../../../state/CategoryEditFormState';
import { CategoryUsecase } from '../../../usecases/CategoryUsecase';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { SelectMode } from '../../../viewModels/SelectMode';
import { isDocumentVisible } from '../../helpers/isDocumentVisible';
import { useInterval } from '../../helpers/useInterval';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryList } from './CategoryList';
import { CategoryStatusBar } from './CategoryStatusBar';

export const CategoriesPage: React.FunctionComponent<EmptyProps> = () => {
  const { data, loading, refetch } = useCategoriesPageQuery({
    fetchPolicy: 'cache-and-network',
  });
  const client = useApolloClient();
  const [categoryEditFormState, dispatch] = React.useReducer(
    categoryEditFormReducer,
    categoryEditFormInitialState
  );
  const [categoryUsecase] = React.useState(
    () => new CategoryUsecase(client, dispatch)
  );

  const userId = data?.me?.id;
  const count = categoryEditFormState.selectedCategoryIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  const handleSelectOneCategory = React.useCallback(
    (category: RootCategoryFragment) => {
      dispatch(categoryEditFormSelectOne(category));
    },
    []
  );

  const handleDeselectCategory = React.useCallback(() => {
    dispatch(categoryEditFormReset());
  }, []);

  const handleCreateOneCategory = React.useCallback(async () => {
    if (!userId) return;
    await categoryUsecase.createOneCategory(userId, categoryEditFormState);
  }, [userId, categoryUsecase, categoryEditFormState]);

  const handleDeleteOneCategory = React.useCallback(async () => {
    await categoryUsecase.deleteOneCategory(
      categoryEditFormState.selectedCategoryIds
    );
  }, [categoryUsecase, categoryEditFormState.selectedCategoryIds]);

  const handleUpdateOneCategory = React.useCallback(async () => {
    await categoryUsecase.updateOneCategory(categoryEditFormState);
  }, [categoryUsecase, categoryEditFormState]);

  // FIXME: Implement
  // const handleArchiveOneCategory = React.useCallback(async () => {
  //   await categoryUsecase.archiveOneCategory(
  //     categoryEditFormState.selectedCategoryIds
  //   );
  // }, [categoryUsecase, categoryEditFormState.selectedCategoryIds]);

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      dispatch(categoryEditFormSet({ name }));
    },
    []
  );

  useInterval(() => {
    if (isDocumentVisible()) {
      refetch();
    }
  }, UPDATE_INTERVAL);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const { name, selectedCategoryIds } = categoryEditFormState;
  const categories = data.categories ?? [];
  const currentCategoryId = selectedCategoryIds[0] ?? null;
  const isSelected = selectMode === SelectMode.SINGLE;

  return (
    <PageContent onClick={handleDeselectCategory}>
      <CategoryStatusBar count={categories.length} />
      <CategoryList
        categories={categories}
        currentCategoryId={currentCategoryId}
        onClick={handleSelectOneCategory}
      />
      <CategoryEditForm
        isSelected={isSelected}
        name={name}
        onChangeName={handleChangeName}
        onCreateOneCategory={handleCreateOneCategory}
        onDeleteOneCategory={handleDeleteOneCategory}
        onUpdateOneCategory={handleUpdateOneCategory}
      />
    </PageContent>
  );
};
