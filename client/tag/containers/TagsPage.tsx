import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { Color } from '../../shared/graphql/__generated__/baseTypes';
import { useGlobalEscapeKey } from '../../shared/hooks/useGlobalEscapeKey';
import { EmptyProps } from '../../view_models/EmptyProps';
import { TagEditForm } from '../components/TagEditForm';
import { TagList } from '../components/TagList';
import { TagStatusBar } from '../components/TagStatusBar';
import {
  tagEditFormReset,
  tagEditFormSelectOne,
  tagEditFormSet,
  tagEditFormToggleCategory,
} from '../ducks/TagEditFormDucks';
import { RootTagFragment } from '../graphql/__generated__/Tag.graphql';
import { useTagsPageState } from '../hooks/useTagsPageState';
import { useTagUsecase } from '../hooks/useTagUsecase';

export const TagsPage: React.FunctionComponent<EmptyProps> = () => {
  const tagUsecase = useTagUsecase();
  const dispatch = useDispatch();
  const {
    currentTagId,
    isLoading,
    rootCategories,
    selectMode,
    tagEditFormState,
    tags,
    userId,
  } = useTagsPageState();
  const { modalType, onCloseModal, onOpenEdit } = useModalType();

  const handleSelectOneTag = React.useCallback(
    (tag: RootTagFragment) => {
      dispatch(tagEditFormSelectOne(tag));
    },
    [dispatch]
  );

  const handleDeselectTag = React.useCallback(() => {
    dispatch(tagEditFormReset());
  }, [dispatch]);

  const handleToggleRootCategory = React.useCallback(
    (category: RootCategoryFragment) => {
      dispatch(tagEditFormToggleCategory(category));
    },
    [dispatch]
  );

  const handleSetName = React.useCallback(
    (name: string) => {
      dispatch(tagEditFormSet({ name }));
    },
    [dispatch]
  );

  const handleSetColor = React.useCallback(
    (color: Color | null) => {
      if (color) {
        dispatch(tagEditFormSet({ color }));
      }
    },
    [dispatch]
  );

  const handleCreateOneTag = React.useCallback(() => {
    if (!userId) return;
    tagUsecase.createOneTag(userId, tagEditFormState);
  }, [userId, tagUsecase, tagEditFormState]);

  const handleDeleteOneTag = React.useCallback(() => {
    tagUsecase.deleteOneTag(tagEditFormState.selectedTagIds);
  }, [tagUsecase, tagEditFormState.selectedTagIds]);

  const handleArchiveOneTag = React.useCallback(() => {
    tagUsecase.archiveOneTag(tagEditFormState.selectedTagIds);
  }, [tagUsecase, tagEditFormState.selectedTagIds]);

  const handleUpdateOneTag = React.useCallback(() => {
    tagUsecase.updateOneTag(tagEditFormState);
  }, [tagUsecase, tagEditFormState]);

  const handleEscape =
    modalType === ModalType.NONE ? handleDeselectTag : onCloseModal;
  useGlobalEscapeKey(handleEscape);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent onClick={handleDeselectTag}>
      <TagStatusBar
        count={tags.length}
        selectMode={selectMode}
        onClickArchive={handleArchiveOneTag}
        onClickEdit={onOpenEdit}
      />
      <TagList
        currentTagId={currentTagId}
        tags={tags}
        onClick={handleSelectOneTag}
      />
      <TagEditForm
        categories={rootCategories}
        isOpen={modalType === ModalType.EDIT}
        selectMode={selectMode}
        tagCategories={tagEditFormState.tagCategories}
        tagEditFormState={tagEditFormState}
        onChangeColor={handleSetColor}
        onChangeName={handleSetName}
        onCloseModal={onCloseModal}
        onCreateOneTag={handleCreateOneTag}
        onDeleteOneTag={handleDeleteOneTag}
        onToggleCategory={handleToggleRootCategory}
        onUpdateOneTag={handleUpdateOneTag}
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
