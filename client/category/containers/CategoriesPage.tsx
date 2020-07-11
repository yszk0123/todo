import React from 'react';
import { useDispatch } from 'react-redux';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { EmptyProps } from '../../viewModels/EmptyProps';
import { CategoryEditForm } from '../components/CategoryEditForm';
import { CategoryList } from '../components/CategoryList';
import { CategoryStatusBar } from '../components/CategoryStatusBar';
import {
  categoryEditFormReset,
  categoryEditFormSelectOne,
  categoryEditFormSet,
} from '../ducks/CategoryEditFormDucks';
import { RootCategoryFragment } from '../graphql/__generated__/Category.graphql';
import { useCategoriesPageState } from '../hooks/useCategoriesPageState';
import { useCategoryUsecase } from '../hooks/useCategoryUsecase';

export const CategoriesPage: React.FunctionComponent<EmptyProps> = () => {
  const categoryUsecase = useCategoryUsecase();
  const dispatch = useDispatch();
  const {
    categories,
    categoryEditFormState,
    currentCategoryId,
    isLoading,
    isSelected,
    userId,
  } = useCategoriesPageState();

  const handleSelectOneCategory = React.useCallback(
    (category: RootCategoryFragment) => {
      dispatch(categoryEditFormSelectOne(category));
    },
    [dispatch]
  );

  const handleDeselectCategory = React.useCallback(() => {
    dispatch(categoryEditFormReset());
  }, [dispatch]);

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
    [dispatch]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

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
        name={categoryEditFormState.name}
        onChangeName={handleChangeName}
        onCreateOneCategory={handleCreateOneCategory}
        onDeleteOneCategory={handleDeleteOneCategory}
        onUpdateOneCategory={handleUpdateOneCategory}
      />
    </PageContent>
  );
};
