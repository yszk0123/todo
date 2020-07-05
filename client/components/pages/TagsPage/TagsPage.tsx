import React from 'react';

import {
  Color,
  TagCreateInput,
  TagUpdateInput,
  TagWhereUniqueInput,
} from '../../../graphql/__generated__/baseTypes';
import {
  useCreateOneTagMutation,
  useDeleteOneTagMutation,
  useTagsPageQuery,
  useUpdateOneTagMutation,
} from '../../../graphql/__generated__/TagsPage.graphql';
import { RootTagFragment } from '../../../graphql/fragments/__generated__/RootTag.graphql';
import { CategoryVM } from '../../../viewModels/CategoryVM';
import { EmptyProps } from '../../../viewModels/EmptyProps';
import { ID } from '../../../viewModels/ID';
import { ContentWrapper } from '../../layout/ContentWrapper';
import { LoadingIndicator } from '../../layout/LoadingIndicator';
import { TagEditForm } from './TagEditForm';
import { TagList } from './TagList';
import { TagStatusBar } from './TagStatusBar';

export const TagsPage: React.FunctionComponent<EmptyProps> = () => {
  const { data, loading, refetch } = useTagsPageQuery({
    fetchPolicy: 'cache-and-network',
  });
  const handleCompleted = React.useCallback(() => {
    refetch();
  }, [refetch]);
  const [createOneTag] = useCreateOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [deleteOneTag] = useDeleteOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [updateOneTag] = useUpdateOneTagMutation({
    onCompleted: handleCompleted,
  });
  const [name, setName] = React.useState('');
  const [color, setColor] = React.useState<Color>(Color.Default);
  const [tagCategories, setTagCategories] = React.useState<CategoryVM[]>([]);
  const [currentTagId, setCurrentTagId] = React.useState<ID | null>(null);
  const isSelected = !!currentTagId;

  const deselect = React.useCallback(() => {
    setCurrentTagId(null);
    setName('');
    setColor(Color.Default);
    setTagCategories([]);
  }, []);

  const handleSelectTag = React.useCallback(
    (tag: RootTagFragment) => {
      if (tag.id !== currentTagId) {
        setCurrentTagId(tag.id);
        setName(tag.name);
        setTagCategories(tag.categories);
        setColor(tag.color ?? '');
      } else {
        deselect();
      }
    },
    [currentTagId, deselect]
  );

  const handleDeselectTag = React.useCallback(() => {
    deselect();
  }, [deselect]);

  const handleCreateOneTag = React.useCallback(() => {
    if (data?.me) {
      const categoriesToConnect = tagCategories.map((c) => ({ id: c.id }));
      const newData: TagCreateInput = {
        owner: { connect: { id: data.me.id } },
        name,
        color,
        categories: { connect: categoriesToConnect },
      };
      deselect();
      createOneTag({ variables: { data: newData } });
    }
  }, [data, name, color, deselect, createOneTag, tagCategories]);

  const handleDeleteOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    if (!confirm('Delete?')) return;
    const where: TagWhereUniqueInput = { id: currentTagId };
    deselect();
    deleteOneTag({ variables: { where } });
  }, [deselect, deleteOneTag, currentTagId]);

  const handleUpdateOneTag = React.useCallback(() => {
    if (!currentTagId) return;
    const categoriesToConnect = tagCategories.map((c) => ({ id: c.id }));
    const newData: TagUpdateInput = {
      name,
      color,
      categories: { connect: categoriesToConnect },
    };
    const where: TagWhereUniqueInput = { id: currentTagId };
    updateOneTag({ variables: { data: newData, where } });
  }, [name, color, updateOneTag, currentTagId, tagCategories]);

  const handleToggleTagCategory = React.useCallback(
    (tag: CategoryVM) => {
      const has = tagCategories.find((t) => t.id === tag.id);
      const newCategories = has
        ? tagCategories.filter((t) => t.id !== tag.id)
        : [...tagCategories, tag];
      setTagCategories(newCategories);
    },
    [tagCategories]
  );

  const handleChangeName = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.currentTarget.value;
      setName(name);
    },
    []
  );

  const handleChangeColor = React.useCallback((color: Color) => {
    setColor(color);
  }, []);

  if (!data) {
    return loading ? <LoadingIndicator /> : null;
  }

  const tags = data.tags ?? [];
  const categories = data.categories ?? [];

  return (
    <ContentWrapper onClick={handleDeselectTag}>
      <TagStatusBar count={tags.length} />
      <TagList
        currentTagId={currentTagId}
        tags={tags}
        onClick={handleSelectTag}
      />
      <TagEditForm
        categories={categories}
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
    </ContentWrapper>
  );
};
