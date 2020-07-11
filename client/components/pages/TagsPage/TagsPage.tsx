import { useApolloClient } from '@apollo/client';
import React from 'react';

import { Color } from '../../../graphql/__generated__/baseTypes';
import { RootCategoryFragment } from '../../../graphql/__generated__/Category.graphql';
import { RootTagFragment } from '../../../graphql/__generated__/Tag.graphql';
import { useTagsPageQuery } from '../../../graphql/__generated__/TagsPage.graphql';
import {
  tagEditFormInitialState,
  tagEditFormReducer,
  tagEditFormReset,
  tagEditFormSelectOne,
  tagEditFormSet,
  tagEditFormToggleCategory,
} from '../../../state/TagEditFormState';
import { TagUsecase } from '../../../usecases/TagUsecase';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { SelectMode } from '../../../viewModels/SelectMode';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { PageContent } from '../../layout/PageContent';
import { TagEditForm } from './TagEditForm';
import { TagList } from './TagList';
import { TagStatusBar } from './TagStatusBar';

export const TagsPage: React.FunctionComponent<EmptyProps> = () => {
  const { data, loading } = useTagsPageQuery({
    fetchPolicy: 'cache-and-network',
  });

  const client = useApolloClient();
  const [tagEditFormState, dispatch] = React.useReducer(
    tagEditFormReducer,
    tagEditFormInitialState
  );
  const [tagUsecase] = React.useState(() => new TagUsecase(client, dispatch));

  const userId = data?.me?.id;
  const count = tagEditFormState.selectedTagIds.length;
  const selectMode =
    count === 0
      ? SelectMode.NONE
      : count === 1
      ? SelectMode.SINGLE
      : SelectMode.MULTI;

  const handleSelectOneTag = React.useCallback((tag: RootTagFragment) => {
    dispatch(tagEditFormSelectOne(tag));
  }, []);

  const handleDeselectTag = React.useCallback(() => {
    dispatch(tagEditFormReset());
  }, []);

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
    []
  );

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      dispatch(tagEditFormSet({ name }));
    },
    []
  );

  const handleChangeColor = React.useCallback((color: Color | null) => {
    if (color) {
      dispatch(tagEditFormSet({ color }));
    }
  }, []);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const { color, name, selectedTagIds, tagCategories } = tagEditFormState;
  const tags = data.tags ?? [];
  const rootCategories = data.categories ?? [];
  const currentTagId = selectedTagIds[0] ?? null;
  const isSelected = selectMode === SelectMode.SINGLE;

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
        color={color}
        isSelected={isSelected}
        name={name}
        tagCategories={tagCategories}
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
