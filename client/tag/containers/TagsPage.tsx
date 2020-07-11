import React from 'react';
import { useDispatch } from 'react-redux';

import { RootCategoryFragment } from '../../category/graphql/__generated__/Category.graphql';
import { LoadingIndicator } from '../../shared/components/LoadingIndicator';
import { PageContent } from '../../shared/components/PageContent';
import { Color } from '../../shared/graphql/__generated__/baseTypes';
import { EmptyProps } from '../../viewModels/EmptyProps';
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
    isSelected,
    rootCategories,
    tagEditFormState,
    tags,
    userId,
  } = useTagsPageState();

  const handleSelectOneTag = React.useCallback(
    (tag: RootTagFragment) => {
      dispatch(tagEditFormSelectOne(tag));
    },
    [dispatch]
  );

  const handleDeselectTag = React.useCallback(() => {
    dispatch(tagEditFormReset());
  }, [dispatch]);

  const handleCreateOneTag = React.useCallback(async () => {
    if (!userId) return;
    await tagUsecase.createOneTag(userId, tagEditFormState);
  }, [userId, tagUsecase, tagEditFormState]);

  const handleDeleteOneTag = React.useCallback(async () => {
    await tagUsecase.deleteOneTag(tagEditFormState.selectedTagIds);
  }, [tagUsecase, tagEditFormState.selectedTagIds]);

  const handleUpdateOneTag = React.useCallback(async () => {
    await tagUsecase.updateOneTag(tagEditFormState);
  }, [tagUsecase, tagEditFormState]);

  // FIXME: Implement
  // const handleArchiveOneTag = React.useCallback(async () => {
  //   await tagUsecase.archiveOneTag(tagEditFormState.selectedTagIds);
  // }, [tagUsecase, tagEditFormState.selectedTagIds]);

  const handleToggleTagCategory = React.useCallback(
    (category: RootCategoryFragment) => {
      dispatch(tagEditFormToggleCategory(category));
    },
    [dispatch]
  );

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      dispatch(tagEditFormSet({ name }));
    },
    [dispatch]
  );

  const handleChangeColor = React.useCallback(
    (color: Color | null) => {
      if (color) {
        dispatch(tagEditFormSet({ color }));
      }
    },
    [dispatch]
  );

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <PageContent onClick={handleDeselectTag}>
      <TagStatusBar count={tags.length} />
      <TagList
        currentTagId={currentTagId}
        tags={tags}
        onClick={handleSelectOneTag}
      />
      <TagEditForm
        categories={rootCategories}
        color={tagEditFormState.color}
        isSelected={isSelected}
        name={name}
        tagCategories={tagEditFormState.tagCategories}
        onChangeColor={handleChangeColor}
        onChangeName={handleChangeName}
        onCreateOneTag={handleCreateOneTag}
        onDeleteOneTag={handleDeleteOneTag}
        onToggleCategory={handleToggleTagCategory}
        onUpdateOneTag={handleUpdateOneTag}
      />
    </PageContent>
  );
};