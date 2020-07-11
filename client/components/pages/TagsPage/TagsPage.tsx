import React from 'react';
import { useDispatch } from 'react-redux';

import { Color } from '../../../graphql/__generated__/baseTypes';
import { RootCategoryFragment } from '../../../graphql/__generated__/Category.graphql';
import { RootTagFragment } from '../../../graphql/__generated__/Tag.graphql';
import {
  tagEditFormReset,
  tagEditFormSelectOne,
  tagEditFormSet,
  tagEditFormToggleCategory,
} from '../../../state/TagEditFormState';
import { useTagUsecase } from '../../../usecases/useTagUsecase';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TagEditForm } from './TagEditForm';
import { TagList } from './TagList';
import { TagStatusBar } from './TagStatusBar';
import { useTagsPageState } from './useTagsPageState';

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
