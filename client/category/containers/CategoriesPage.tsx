import React from 'react';
import { useDispatch } from 'react-redux';

import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { EmptyProps } from '../../view_models/EmptyProps';
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
    selectMode,
    userId,
  } = useCategoriesPageState();
  const { modalType, onCloseModal, onOpenEdit } = useModalType();

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
    (name: string) => {
      dispatch(categoryEditFormSet({ name }));
    },
    [dispatch]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent onClick={handleDeselectCategory}>
      <CategoryStatusBar
        count={categories.length}
        selectMode={selectMode}
        onClickEdit={onOpenEdit}
      />
      <CategoryList
        categories={categories}
        currentCategoryId={currentCategoryId}
        onClick={handleSelectOneCategory}
      />
      <CategoryEditForm
        categoryEditFormState={categoryEditFormState}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        onChangeName={handleChangeName}
        onCloseModal={onCloseModal}
        onCreateOneCategory={handleCreateOneCategory}
        onDeleteOneCategory={handleDeleteOneCategory}
        onUpdateOneCategory={handleUpdateOneCategory}
      />
    </PageContent>
  );
};

enum ModalType {
  NONE,
  EDIT,
}

function useModalType() {
  const [modalType, setModalType] = React.useState(ModalType.NONE);

  const onCloseModal = React.useCallback(() => {
    setModalType(ModalType.NONE);
  }, []);

  const onOpenEdit = React.useCallback(() => {
    setModalType(ModalType.EDIT);
  }, []);

  return { onCloseModal, onOpenEdit, modalType };
}
