import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../../graphql/__generated__/Category.graphql';
import {
  categoryEditFormReset,
  categoryEditFormSelectOne,
  categoryEditFormSet,
} from '../../../models/CategoryEditFormState';
import { useCategoryUsecase } from '../../../usecases/useCategoryUsecase';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { CategoryEditForm } from './CategoryEditForm';
import { CategoryList } from './CategoryList';
import { CategoryStatusBar } from './CategoryStatusBar';
import { useCategoriesPageState } from './useCategoriesPageState';

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
